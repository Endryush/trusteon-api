import express from 'express';
import healthCheckRouter from './health-check.route.js'
import userRouter from './user.route.js'
import productRouter from './product.route.js'
const router = express.Router();

router
  .use('/health-check', healthCheckRouter)
  .use('/user', userRouter)
  .use('/product', productRouter)

export default router