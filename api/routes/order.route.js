import express from 'express';
import jwtAuth from '../middlewares/jwtAuth.js';
import orderController from '../controllers/order.controller.js';
import { validateBody } from '../middlewares/validate.js';
import { createOrderSchema, updateOrderStatusSchema } from '../schemas/order.schema.js';

const router = express.Router()

router
  .post('/', jwtAuth, validateBody(createOrderSchema), orderController.createOrder)
  .get('/', jwtAuth, orderController.getUserOrders)
  .patch('/', jwtAuth, validateBody(updateOrderStatusSchema), orderController.updateOrderStatus)
  .get('/author', jwtAuth, orderController.getOrderByAuthors)
  .get('/allStatus', orderController.getAllStatusOrder)

export default router
