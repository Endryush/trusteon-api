import NotFoundException from "../exceptions/NotFoundException.js";
import BadRequestException from "../exceptions/BadRequestException.js"
import feedbackRepository from "../repositories/feedback.repository.js";
import orderRepository from "../repositories/order.repository.js";
import { ALL_STATUS_ID } from "../enums/status.enum.js";

async function createFeedback(feedback) {
  const order = await getValidOrder(feedback.orderId)

  if (order.userId === feedback.userId) return await feedbackRepository.createAuthorFeedback(feedback)
  
  if (order.authorId === feedback.userId) return await feedbackRepository.createClientFeedback(feedback)

  throw new BadRequestException('User not found in order')
}

async function getQuestions(userId, orderId) {
  const order = await getValidOrder(orderId)
  // throw new Error(`${order.userId} ${orderId}`)
  if (userId === order.userId) return await feedbackRepository.getAuthorQuestions()

  if(userId === order.authorId) return await feedbackRepository.getClientQuestions()
  
  throw new BadRequestException('User not found in order')
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