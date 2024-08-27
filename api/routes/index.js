import express from 'express';
import healthCheckRouter from './health-check.route.js'
import userRouter from './user.route.js'

const router = express.Router();

router
  .use('/health-check', healthCheckRouter)
  .use('/user', userRouter)

export default router