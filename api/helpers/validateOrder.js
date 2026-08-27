import validateFieldsDefault from "./validateFieldsDefault.js"

export function validateOrder(order) {
  const requiredFields = ['totalAmount', 'authorId', 'serviceId']
  validateFieldsDefault(requiredFields, order)
}