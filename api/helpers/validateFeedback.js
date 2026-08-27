import BadRequestException from "../exceptions/BadRequestException.js";

export function validateFeedback(feedback) {
  if (!feedback.orderId) throw new BadRequestException('orderId is required') 
}