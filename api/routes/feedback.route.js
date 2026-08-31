import express from 'express';
import jwtAuth from '../middlewares/jwtAuth.js'
import feedbackController from '../controllers/feedback.controller.js';
import { validateBody, validateQuery } from '../middlewares/validate.js';
import { createFeedbackSchema, feedbackQuerySchema } from '../schemas/feedback.schema.js';

const router = express.Router()

router
  .get('/questions', jwtAuth, validateQuery(feedbackQuerySchema), feedbackController.getQuestions)
  .post('/', jwtAuth, validateBody(createFeedbackSchema), feedbackController.createFeedback)

export default router
