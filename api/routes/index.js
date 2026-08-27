import express from 'express';
import healthCheckRouter from './health-check.route.js'
import userRouter from './user.route.js'
import productRouter from './product.route.js'
import orderRouter from './order.route.js'
import walletRouter from './wallet.route.js'
import feedbackRouter from './feedback.route.js'

const router = express.Router();

router
  .use('/health-check', healthCheckRouter)
  .use('/user', userRouter)
  .use('/products', productRouter)
  .use('/order', orderRouter)
  .use('/wallet', walletRouter)
  .use('/feedback', feedbackRouter)

export default router