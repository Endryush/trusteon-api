import express from 'express';
import userController from '../controllers/user.controller.js';
import jwtAuth from '../middlewares/jwtAuth.js';
import { validateBody } from '../middlewares/validate.js';
import { loginSchema, registerUserSchema, updateUserSchema } from '../schemas/user.schema.js';

const router = express.Router()

router
  .post('/register', validateBody(registerUserSchema), userController.registerUser)
  .post('/login', validateBody(loginSchema), userController.login)
  .get('/me', jwtAuth, userController.getUserMe)
  .patch('/', jwtAuth, validateBody(updateUserSchema), userController.updateUser)

export default router
