import express from 'express';
import jwtUserAuth from '../middlewares/jwtUserAuth.js';
import orderController from '../controllers/order.controller.js';


const router = express.Router()

router
  .post('/', jwtUserAuth , orderController.createOrder)

export default router