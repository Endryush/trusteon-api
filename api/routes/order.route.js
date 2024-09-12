import express from 'express';
import jwtUserAuth from '../middlewares/jwtUserAuth.js';
import jwyOrders from '../middlewares/jwtOrders.js'
import orderController from '../controllers/order.controller.js';


const router = express.Router()

router
  .post('/', jwtUserAuth , orderController.createOrder)
  .get('/', jwyOrders , orderController.getUserOrders)
  .patch('/', jwyOrders , orderController.updateOrderStatus)
  .get('/author', jwyOrders, orderController.getOrderByAuthors)
  .get('/allStatus', orderController.getAllStatusOrder)

export default router