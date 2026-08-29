import Order from '../models/order.model.js'
import Product from '../models/product.model.js'
import ServiceStatus from '../models/service-status.model.js'
import User from '../models/user.model.js'

async function createOrder (order) {
  return await Order.create(order)
}

async function getUserOrders (id) {
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
}

async function getOrderById (id, options = {}) {
  return await Order.findByPk(id, options)
}

async function updateOrderStatus (order, options = {}) {
  return await Order.update({ orderStatus: order.status }, {
    fields: ['orderStatus'],
    where: { id: order.id },
    ...options
  })
}

async function getOrderByAuthors (id) {
  return await Order.findAll({
    where: {
      authorId: id
    },
    include: [
      {
        model: Product,
        as: 'product',
        attributes: ['name']
      },
      {
        model: User,
        as: 'user',
        attributes: [['name', 'requestor']]
      }
    ],
    order: [['createdAt', 'ASC']]
  })
}

async function getAllStatusOrder () {
  return await ServiceStatus.findAll({
    attributes: ['id', 'status'],
    order: [['id', 'ASC']]
  })
}

export default {
  createOrder,
  getUserOrders,
  updateOrderStatus,
  getOrderByAuthors,
  getAllStatusOrder,
  getOrderById
}
