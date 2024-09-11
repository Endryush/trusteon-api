
import { where } from 'sequelize'
import Order from '../models/order.model.js'
import Product from '../models/product.model.js'
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
        },
        {
          model: Product,
          as: 'product',
          attributes: ['name']
        }
      ],
      order: [['createdAt', 'DESC']]
    })
  } catch (error) {
    throw error
  }
}

async function updateOrderStatus (order) {
  try {
    return await Order.update( { orderStatus: order.status }, 
      { 
        fields: ['orderStatus'],
        where: { id: order.id }
      },
    )
  } catch {
    throw error
  }
}

export default {
  createOrder,
  getUserOrders,
  updateOrderStatus
}