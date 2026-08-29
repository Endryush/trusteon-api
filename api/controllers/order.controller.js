import orderService from "../services/order.service.js"
import logger from "../logger.js"

async function createOrder (req, res, next) {
  try {
    await orderService.createOrder(req.body, req.user.id)

    res.status(201).send()
    logger.info('POST IN createOrder')
  } catch (error) {
    next(error)
  }
}

async function getUserOrders (req, res, next) {
  try {
    res.send(await orderService.getUserOrders(req.user.id))
    logger.info('GET IN getUserOrders')
  } catch (error) {
    next(error)
  }
}

async function updateOrderStatus (req, res, next) {
  try {
    await orderService.updateOrderStatus(req.body, req.user.id)
    res.status(204).send()
    logger.info('PATCH IN updateOrderStatus')
  } catch (error) {
    next(error)
  }
}

async function getOrderByAuthors (req, res, next) {
  try {
    res.send(await orderService.getOrderByAuthors(req.user.id))
    logger.info('GET IN getOrderByAuthors')
  } catch (error) {
    next(error)
  }
}

async function getAllStatusOrder (req, res, next) {
  try {
    res.send(await orderService.getAllStatusOrder())
    logger.info('GET IN getAllStatusOrder')
  } catch (error) {
    next(error)
  }
}

export default {
  createOrder,
  getUserOrders,
  updateOrderStatus,
  getOrderByAuthors,
  getAllStatusOrder
}
