import express from 'express';
import jwtUserAuth from '../middlewares/jwtUserAuth.js';
import jwtOrders from '../middlewares/jwtOrders.js'
import orderController from '../controllers/order.controller.js';


const router = express.Router()

router
  .post('/', jwtUserAuth , orderController.createOrder)
  .get('/', jwtOrders , orderController.getUserOrders)
  .patch('/', jwtOrders , orderController.updateOrderStatus)
  .get('/author', jwtOrders, orderController.getOrderByAuthors)
  .get('/allStatus', orderController.getAllStatusOrder)

export default router