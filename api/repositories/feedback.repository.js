import AuthorFeedback from "../models/author-feedback.model.js"
import AuthorQuestions from "../models/author-question.model.js"
import ClientFeedback from "../models/client-feedback.model.js"
import ClientQuestions from "../models/client-questions.model.js"
import Ratings from "../models/rating.model.js"
import AlreadyExistException from "../exceptions/AlreadyExistException.js"

async function createAuthorFeedback (feedback, userId) {
  const orderId = feedback[0].orderId
  const feedbackOrder = await AuthorFeedback.findOne(
    { where: { orderId } }
  )

  if (feedbackOrder) throw new AlreadyExistException('Service already reviewed')

  await AuthorFeedback.bulkCreate(feedback)
  return await AuthorFeedback.findAll({
    where: { userId }
  })
}

async function createClientFeedback (feedback, userId) {
  const orderId = feedback[0].orderId
  const feedbackOrder = await ClientFeedback.findOne(
    { where: { orderId } }
  )

  if (feedbackOrder) throw new AlreadyExistException('Service already reviewed')
  await ClientFeedback.bulkCreate(feedback)
  return await ClientFeedback.findAll({
    where: { userId }
  })
}

async function getAuthorQuestions () {
  return await AuthorQuestions.findAll({
    attributes: { exclude: ['updatedAt', 'createdAt'] }
  })
}

async function getClientQuestions () {
  return await ClientQuestions.findAll({
    attributes: { exclude: ['updatedAt', 'createdAt'] }
  })
}

async function getRatings () {
  return await Ratings.findAll({
    attributes: { exclude: ['updatedAt', 'createdAt'] }
  })
}

export default {
  createAuthorFeedback,
  createClientFeedback,
  getAuthorQuestions,
  getClientQuestions,
  getRatings
}
