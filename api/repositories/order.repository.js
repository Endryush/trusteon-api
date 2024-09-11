
import Order from '../models/order.model.js'
import ServiceStatus from '../models/service-status.model.js'

async function createOrder (order) {
  try {
    return await Order.create(order)
  } catch (error) {
    throw error 
  }
}

async function getUserOrders (id) {
  try {
    return await Order.findAll({
      where: {
        userId: id
      },
      include: [
        {
          model: ServiceStatus,
          as: 'services_status',
          attributes: ['status']
        }
      ],
    })
  } catch (error) {
    throw error
  }
}

export default {
  createOrder,
  getUserOrders
}