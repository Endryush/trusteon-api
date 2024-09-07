import BadRequestException from "../exceptions/BadRequestException.js"
import validateFieldsDefault from "./validateFieldsDefault.js"

export function validateOrder(order) {
  const requiredFields = ['totalAmount', 'authorId', 'serviceId']
  if (order.userId === order.authorId) throw new BadRequestException('userId and authorId must be different')

  validateFieldsDefault(requiredFields, order)
}