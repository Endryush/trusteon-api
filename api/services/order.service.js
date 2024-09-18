import { ALL_STATUS_ID } from "../enums/status.enum.js";
import orderRepository from "../repositories/order.repository.js";
import walletService from "./wallet.service.js";

const ENABLED_STATUS = [
  ALL_STATUS_ID.OPEN,
  ALL_STATUS_ID.WAIT_LIST,
  ALL_STATUS_ID.WAITING_APPROVE,
  ALL_STATUS_ID.PENDING_REVIEW,
  ALL_STATUS_ID.APPROVED,
  ALL_STATUS_ID.IN_PROGRESS,
]

async function createOrder(order) {
  return await orderRepository.createOrder(order)
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

async function updateOrderStatus (order) {
  const orderFormatted = {
    id: order.orderId,
    status: order.status
  }

  const currentOrder = await orderRepository.getOrderById(order.orderId)
  if (currentOrder.orderStatus === order.status) throw new Error('Nothing to update')

  if (order.status === ALL_STATUS_ID.APPROVED)  await walletService.saveWallet(order.orderId)

  return await orderRepository.updateOrderStatus(orderFormatted)
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

function getApplicableStatus (status) {
  const applicableStatus = []
  switch (status) {
    case(ALL_STATUS_ID.OPEN):
      applicableStatus.push(ALL_STATUS_ID.IN_PROGRESS, ALL_STATUS_ID.WAIT_LIST)
      break
    case (ALL_STATUS_ID.WAIT_LIST):
      applicableStatus.push(ALL_STATUS_ID.OPEN, ALL_STATUS_ID.IN_PROGRESS)
      break
    case (ALL_STATUS_ID.IN_PROGRESS):
      applicableStatus.push(ALL_STATUS_ID.OPEN, ALL_STATUS_ID.WAITING_APPROVE)
      break
  }
  return applicableStatus
}

export default {
  createOrder,
  getUserOrders,
  updateOrderStatus,
  getOrderByAuthors,
  getAllStatusOrder
}