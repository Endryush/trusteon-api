import orderRepository from "../repositories/order.repository.js";


async function createOrder(order) {
  return await orderRepository.createOrder(order)
}

async function getUserOrders (id) {
  return await orderRepository.getUserOrders(id)
}

export default {
  createOrder,
  getUserOrders
}