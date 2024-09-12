import { ALL_STATUS_ID } from "../enums/status.enum.js";
import orderRepository from "../repositories/order.repository.js";

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
  const formattedOrders = orders.map((order) => {
    const plainOrder = order.get({ plain: true });
    const status = plainOrder.services_status.status
    delete plainOrder.services_status
    return {
      ...plainOrder,
      status,
    }
  })
  return formattedOrders
}

async function updateOrderStatus (order) {
  const orderFormatted = {
    id: order.orderId,
    status: order.status
  }

  return await orderRepository.updateOrderStatus(orderFormatted)
}

async function getOrderByAuthors (id) {
  return await orderRepository.getOrderByAuthors(id)
}

async function getAllStatusOrder () {
  const allStatus = await orderRepository.getAllStatusOrder()
  const statusFiltered = allStatus.filter((status) => ENABLED_STATUS.includes(status.id))

  return statusFiltered
}

export default {
  createOrder,
  getUserOrders,
  updateOrderStatus,
  getOrderByAuthors,
  getAllStatusOrder
}