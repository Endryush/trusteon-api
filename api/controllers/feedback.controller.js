import BadRequestException from "../exceptions/BadRequestException.js"
import { validateFeedback } from "../helpers/validateFeedback.js"
import feedbackService from "../services/feedback.service.js"


async function createFeedback (req, res, next) {
  try {
    const feedback = req.body
    validateFeedback(feedback)
    if (!feedback.questions || feedback.questions.length === 0) throw new BadRequestException('Feedback must have at least one question')


    res.status(201).send(await feedbackService.createFeedback(feedback))
    logger.info('POST IN createFeedback')
  } catch (error) {
    next(error)
  }
}

async function getQuestions(req, res, next) {
  try {
    const { userId, orderId } = req.query
    validateFeedback(req.query)
    const questions = await feedbackService.getQuestions(parseInt(userId), parseInt(orderId))

    res.send(questions)
    logger.info('POST IN getQuestions')
  } catch (error) {
    next(error)
  }
}

export default {
  createFeedback,
  getQuestions
}