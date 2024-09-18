import NotFoundException from "../exceptions/NotFoundException.js";
import BadRequestException from "../exceptions/BadRequestException.js"
import feedbackRepository from "../repositories/feedback.repository.js";
import orderRepository from "../repositories/order.repository.js";
import { ALL_STATUS_ID } from "../enums/status.enum.js";
import userRepository from "../repositories/user.repository.js";

async function createFeedback(feedback) {
  const order = await getValidOrder(feedback.orderId)
  const isUser = order.userId === feedback.userId
  const feedbackResponse = isUser ?
    await feedbackRepository.createAuthorFeedback(feedback.questions, feedback.userId):
    await feedbackRepository.createClientFeedback(feedback.questions, feedback.userId)
  
  const avgReputation = (feedbackResponse.reduce((acc, feedback) => acc + feedback.rating, 0)) / feedbackResponse.length
  return await userRepository.updateReputation(feedback.userId, avgReputation, isUser)
}

async function getQuestions(userId, orderId) {
  const order = await getValidOrder(orderId)
  const ratings = await feedbackRepository.getRatings()
  const questions = userId === order.userId ? await feedbackRepository.getAuthorQuestions() : await feedbackRepository.getClientQuestions()
  
  return {
    questions,
    ratings
  }
}

async function getValidOrder (orderId) {
  const order = await orderRepository.getOrderById(orderId)

  if (!order) throw NotFoundException('Order not found')
  if (order.orderStatus !== ALL_STATUS_ID.APPROVED) throw new BadRequestException('order not approved yet')
  
  return order
}

export default {
  createFeedback,
  getQuestions
}