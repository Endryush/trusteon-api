import validateFieldsDefault from "./validateFieldsDefault.js"

export function validateProduct(product) {
  const requiredFields = ['name', 'totalAmount', 'ownerId', 'email']
  validateFieldsDefault(requiredFields, product)
}