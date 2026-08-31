import User from "../models/user.model.js";

async function registerUser (user) {
  return await User.create(user)
}

async function getUserByEmail (email) {
  return await User.findOne({
    where: { email },
    attributes: { exclude: ['createdAt', 'updatedAt'] }
  })
}

async function getUserById (id) {
  return await User.findOne({
    where: { id },
    attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
  })
}

async function updateReputation (id, reputation, isUser = false) {
  const field = isUser ? 'authorReputation' : 'userReputation'
  return await User.update({ [field]: reputation }, {
    where: { id },
  })
}

async function updateUser (userId, fields) {
  await User.update(fields, {
    where: { id: userId },
    fields: ['name', 'email', 'userImage']
  })

  return await getUserById(userId)
}

export default {
  registerUser,
  getUserByEmail,
  getUserById,
  updateReputation,
  updateUser
}
