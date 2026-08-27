import express from 'express';
import jwtAuth from '../middlewares/jwtAuth.js';
import orderController from '../controllers/order.controller.js';


const router = express.Router()

router
  .post('/', jwtAuth, orderController.createOrder)
  .get('/', jwtAuth, orderController.getUserOrders)
  .patch('/', jwtAuth, orderController.updateOrderStatus)
  .get('/author', jwtAuth, orderController.getOrderByAuthors)
  .get('/allStatus', orderController.getAllStatusOrder)

export default router
