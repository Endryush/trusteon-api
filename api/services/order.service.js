import {
  ALL_STATUS_ID,
  AUTHOR_STATUS_TRANSITIONS,
  BUYER_STATUS_TRANSITIONS,
} from "../enums/status.enum.js";
import BadRequestException from "../exceptions/BadRequestException.js";
import ForbiddenException from "../exceptions/ForbiddenException.js";
import NotFoundException from "../exceptions/NotFoundException.js";
import orderRepository from "../repositories/order.repository.js";
import walletService from "./wallet.service.js";
import db from "../config/db.js";

const ENABLED_STATUS = [
  ALL_STATUS_ID.OPEN,
  ALL_STATUS_ID.WAIT_LIST,
  ALL_STATUS_ID.WAITING_APPROVE,
  ALL_STATUS_ID.PENDING_REVIEW,
  ALL_STATUS_ID.APPROVED,
  ALL_STATUS_ID.IN_PROGRESS,
]

async function createOrder(order, requesterId) {
  if (Number(order.authorId) === Number(requesterId)) {
    throw new BadRequestException('userId and authorId must be different')
  }

  return await orderRepository.createOrder({
    totalAmount: order.totalAmount,
    authorId: order.authorId,
    serviceId: order.serviceId,
    orderStatus: order.orderStatus,
    userId: requesterId
  })
}

async function getUserOrders (id) {
  const orders =  await orderRepository.getUserOrders(id)
  const allStatus = await orderRepository.getAllStatusOrder()
  const formattedOrders = orders.map((order) => {
    const plainOrder = order.get({ plain: true });
    const status = plainOrder.services_status.status
    delete plainOrder.services_status
    let applicableStatus = []
    if (plainOrder.orderStatus === ALL_STATUS_ID.WAITING_APPROVE) {
      const updateOrderStatus = allStatus
        .filter(status => [ALL_STATUS_ID.APPROVED, ALL_STATUS_ID.PENDING_REVIEW].includes(status.id))
        .map(status => ({ id: status.id, status: status.id === ALL_STATUS_ID.APPROVED ? 'Aprovar' : 'Pedir Revisão' }))
      applicableStatus = (updateOrderStatus)
    }
    return {
      ...plainOrder,
      status,
      applicableStatus
    }
  })
  return formattedOrders
}

async function updateOrderStatus (order, requesterId) {
  const orderFormatted = {
    id: order.orderId,
    status: order.status
  }

  return await db.transaction(async (transaction) => {
    const currentOrder = await orderRepository.getOrderById(order.orderId, {
      transaction,
      lock: transaction.LOCK.UPDATE
    })
    if (!currentOrder) throw new NotFoundException('Order not found')
    assertAllowedStatusTransition(currentOrder, requesterId, order.status)

    if (Number(order.status) === ALL_STATUS_ID.APPROVED) {
      await walletService.saveWallet(order.orderId, { transaction })
    }

    return await orderRepository.updateOrderStatus(orderFormatted, { transaction })
  })
}

async function getOrderByAuthors (id) {
  return await orderRepository.getOrderByAuthors(id)
}

async function getAllStatusOrder () {
  const allStatus = await orderRepository.getAllStatusOrder()
  const statusFiltered = allStatus.filter((status) => ENABLED_STATUS.includes(status.id))
  const finalStatus = statusFiltered.map((status) => {
    const plainStatus = status.get({ plain: true });
    return {
      ...plainStatus,
      applicableStatus: getApplicableStatus(plainStatus.id)
    }
  })
  return finalStatus
}

function assertAllowedStatusTransition (order, requesterId, nextStatus) {
  const isBuyer = Number(order.userId) === Number(requesterId)
  const isAuthor = Number(order.authorId) === Number(requesterId)

  if (!isBuyer && !isAuthor) {
    throw new ForbiddenException('You cannot access this order')
  }

  if (Number(order.orderStatus) === Number(nextStatus)) {
    throw new BadRequestException('Nothing to update')
  }

  const currentStatus = Number(order.orderStatus)
  const allowed = isAuthor
    ? AUTHOR_STATUS_TRANSITIONS[currentStatus] ?? []
    : BUYER_STATUS_TRANSITIONS[currentStatus] ?? []

  if (!allowed.includes(Number(nextStatus))) {
    throw new ForbiddenException('You cannot update this order to this status')
  }
}

function getApplicableStatus (status) {
  return AUTHOR_STATUS_TRANSITIONS[status] ?? []
}

export default {
  createOrder,
  getUserOrders,
  updateOrderStatus,
  getOrderByAuthors,
  getAllStatusOrder
}