import orderRepository from "../repositories/order.repository.js";


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

export default {
  createOrder,
  getUserOrders,
  updateOrderStatus,
  getOrderByAuthors
}