import express from 'express';
import userController from '../controllers/user.controller.js';
import jwtAuth from '../middlewares/jwtAuth.js';

const router = express.Router()

router
  .post('/register', userController.registerUser)
  .post('/login', userController.login)
  .get('/me', jwtAuth, userController.getUserMe)
  .patch('/', jwtAuth, userController.updateUser)

export default router
