import express from 'express';
import jwtAuth from '../middlewares/jwtAuth.js'
import feedbackController from '../controllers/feedback.controller.js';


const router = express.Router()

router
  .get('/questions', jwtAuth, feedbackController.getQuestions)
  .post('/', jwtAuth, feedbackController.createFeedback)

export default router
