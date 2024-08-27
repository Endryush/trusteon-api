import express from 'express';
import userController from '../controllers/user.controller.js';

const router = express.Router()

router
  .post('/register', userController.registerUser)
  .post('/login', userController.login)

export default router