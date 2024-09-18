import BadRequestException from "../exceptions/BadRequestException.js";

export function validateFeedback(feedback) {
  if (!feedback.orderId || !feedback.userId) throw new BadRequestException('orderId and userId are required') 
}