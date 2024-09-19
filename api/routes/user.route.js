import express from 'express';
import userController from '../controllers/user.controller.js';
import jwtUserAuth from '../middlewares/jwtUserAuth.js';

const router = express.Router()

router
  .post('/register', userController.registerUser)
  .post('/login', userController.login)
  .get('/me', userController.getUserMe)
  .patch('/', jwtUserAuth, userController.updateUser)

export default router