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

export default {
  createOrder
}
