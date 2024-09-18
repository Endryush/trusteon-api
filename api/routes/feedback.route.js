import express from 'express';
import jwtOrders from '../middlewares/jwtOrders.js'
import feedbackController from '../controllers/feedback.controller.js';


const router = express.Router()

router
  .get('/questions', jwtOrders , feedbackController.getQuestions)
  .post('/', jwtOrders , feedbackController.createFeedback)

export default router