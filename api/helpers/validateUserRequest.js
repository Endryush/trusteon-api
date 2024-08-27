import validateFieldsDefault from "./validateFieldsDefault.js"

export function validateUser(user) {
  const requiredFields = ['name', 'email', 'password']
  validateFieldsDefault(requiredFields, user)
}