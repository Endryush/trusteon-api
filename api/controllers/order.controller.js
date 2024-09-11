import BadRequestException from "../exceptions/BadRequestException.js"
import { validateOrder } from "../helpers/validateOrder.js"
import orderService from "../services/order.service.js"

async function createOrder (req, res, next) {
  try {
    const order = req.body
    validateOrder(order)
    await orderService.createOrder(order)

    res.status(201).send()
    logger.info('POST IN createOrder')
  } catch (error) {
    next(error)
  }
}

async function getUserOrders (req, res, next) {
  try {
    const { userId } = req.query

    res.send(await orderService.getUserOrders(userId))
    logger.info('GET IN getUserOrders')
  } catch (error) {
    next(error)
  }
}

async function updateOrderStatus (req, res, next) {
  try {
    const order = req.body

    if (!order.orderId || !order.status) throw new BadRequestException('Invalid order')
    await orderService.updateOrderStatus(order)
    res.status(204).send()
    logger.info('PATCH IN updateOrderStatus')
  } catch (error) {
    next(error)
  }
}

async function getOrderByAuthors (req, res, next) {
  try {
    const { userId } = req.query
    if (!userId) throw new BadRequestException('Informe um autor válido')
    res.send(await orderService.getOrderByAuthors(userId))
    logger.info('GET IN getOrderByAuthors')
  } catch (error) {
    next(error)
  }
}

export default {
  createOrder,
  getUserOrders,
  updateOrderStatus,
  getOrderByAuthors
}
