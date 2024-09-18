import AuthorFeedback from "../models/author-feedback.model.js"
import AuthorQuestions from "../models/author-question.model.js"
import ClientFeedback from "../models/client-feedback.model.js"
import ClientQuestions from "../models/client-questions.model.js"
import Ratings from "../models/rating.model.js"

async function createAuthorFeedback (feedback, userId) {
  try {
    await AuthorFeedback.bulkCreate(feedback)
    return await AuthorFeedback.findAll({
      where: { userId }
    })
  } catch (error) {
    throw error
  }
}

async function createClientFeedback (feedback, userId) {
  try {
    await ClientFeedback.bulkCreate(feedback)
    return await ClientFeedback.findAll({
      where: { userId }
    })
  } catch (error) {
    throw error
  }
}

async function getAuthorQuestions () {
  try {
    return await AuthorQuestions.findAll({
      attributes:  { exclude: ['updatedAt', 'createdAt'] }
    })
  } catch (error) {
    throw error
  }
}

async function getClientQuestions () {
  try {
    return await ClientQuestions.findAll({
      attributes:  { exclude: ['updatedAt', 'createdAt'] }
    })
  } catch (error) {
    throw error
  }
}

async function getRatings () {
  try {
    return await Ratings.findAll({
      attributes:  { exclude: ['updatedAt', 'createdAt'] }
    })
  } catch (error) {
    throw error
  }
}

export default {
  createAuthorFeedback,
  createClientFeedback,
  getAuthorQuestions,
  getClientQuestions,
  getRatings
}