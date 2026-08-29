import feedbackService from "../services/feedback.service.js"
import logger from "../logger.js"

async function createFeedback (req, res, next) {
  try {
    res.status(201).send(await feedbackService.createFeedback(req.body, req.user.id))
    logger.info('POST IN createFeedback')
  } catch (error) {
    next(error)
  }
}

async function getQuestions(req, res, next) {
  try {
    const questions = await feedbackService.getQuestions(req.user.id, req.query.orderId)

    res.send(questions)
    logger.info('GET IN getQuestions')
  } catch (error) {
    next(error)
  }
}

export default {
  createFeedback,
  getQuestions
}
