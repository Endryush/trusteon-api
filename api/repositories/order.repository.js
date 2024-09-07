
import Order from '../models/order.model.js'

async function createOrder (order) {
  try {
    return await Order.create(order)
  } catch (error) {
    throw error 
  }
}

export default {
  createOrder
}