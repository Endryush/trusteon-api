import User from "../models/user.model.js";

async function registerUser (user) {
  try {
    return await User.create(user)
  } catch (error) {
    throw error 
  }
}

async function getUserByEmail (email) {
  try {
    return await User.findOne({
      where: { email },
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    })
  } catch (error) {
    throw error
  }
}

async function getUserById (id) {
  try {
    return await User.findOne({
      where: { id },
      attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
    })
  } catch (error) {
    throw error
  }
}

async function updateReputation (id, reputation, isUser = false) {
  try {
    const field = isUser ? 'authorReputation' : 'userReputation' 
    return await User.update({ [field]: reputation },  {
      where: { id },
    })
  } catch (error) {
    throw error
  }
}

export default {
  registerUser,
  getUserByEmail,
  getUserById,
  updateReputation
}