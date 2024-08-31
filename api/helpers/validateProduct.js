import validateFieldsDefault from "./validateFieldsDefault.js"

export function validateProduct(product) {
  const requiredFields = ['name', 'totalAmount', 'authorId', 'email']
  validateFieldsDefault(requiredFields, product)
}