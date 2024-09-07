import orderRepository from "../repositories/order.repository.js";


async function createOrder(order) {
  return await orderRepository.createOrder(order)
}

export default {
  createOrder
}