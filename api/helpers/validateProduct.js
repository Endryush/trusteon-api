import validateFieldsDefault from "./validateFieldsDefault.js"

export function validateProduct(product) {
  const requiredFields = ['name', 'totalAmount', 'ownerId']
  validateFieldsDefault(requiredFields, product)
}