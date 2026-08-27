import NotFoundException from "../exceptions/NotFoundException.js";
import BadRequestException from "../exceptions/BadRequestException.js"
import ForbiddenException from "../exceptions/ForbiddenException.js";
import feedbackRepository from "../repositories/feedback.repository.js";
import orderRepository from "../repositories/order.repository.js";
import { ALL_STATUS_ID } from "../enums/status.enum.js";
import userRepository from "../repositories/user.repository.js";

async function createFeedback(feedback, requesterId) {
  const order = await getValidOrder(feedback.orderId)
  assertOrderParticipant(order, requesterId)
  const isUser = Number(order.userId) === Number(requesterId)
  const idToUpdate = isUser ? order.authorId : order.userId
  const formattedQuestions = feedback.questions.map((question) => {
    return {
      ...question,
      userId: idToUpdate
    }
  })
  const feedbackResponse = isUser ?
    await feedbackRepository.createAuthorFeedback(formattedQuestions, idToUpdate):
    await feedbackRepository.createClientFeedback(formattedQuestions,idToUpdate)
  
  const avgReputation = (feedbackResponse.reduce((acc, feedback) => acc + feedback.rating, 0)) / feedbackResponse.length
  return await userRepository.updateReputation(idToUpdate, avgReputation, isUser)
}

async function getQuestions(userId, orderId) {
  const order = await getValidOrder(orderId)
  assertOrderParticipant(order, userId)
  const ratings = await feedbackRepository.getRatings()
  const questions = Number(userId) === Number(order.userId) ? await feedbackRepository.getAuthorQuestions() : await feedbackRepository.getClientQuestions()
  
  return {
    questions,
    ratings
  }
}

async function getValidOrder (orderId) {
  const order = await orderRepository.getOrderById(orderId)

  if (!order) throw new NotFoundException('Order not found')
  if (order.orderStatus !== ALL_STATUS_ID.APPROVED) throw new BadRequestException('order not approved yet')
  
  return order
}

function assertOrderParticipant (order, requesterId) {
  const isParticipant = Number(order.userId) === Number(requesterId)
    || Number(order.authorId) === Number(requesterId)
  if (!isParticipant) {
    throw new ForbiddenException('You cannot access this order')
  }
}

export default {
  createFeedback,
  getQuestions
}