import userRepository from "../repositories/user.repository.js";
import AlreadyExistException from '../exceptions/AlreadyExistException.js';
import NotFoundException from '../exceptions/NotFoundException.js';
import UnauthorizedException from '../exceptions/UnauthorizedException.js';
import BadRequestException from '../exceptions/BadRequestException.js';
import  { hashPassword, comparePassword, generateToken } from '../utils/bcrypt.js';

async function registerUser (user) {
  const alreadyIsUser = await userRepository.getUserByEmail(user.email);
  if (alreadyIsUser) {
    throw new AlreadyExistException('User already exists');
  }
    
  const hashedPassword = await hashPassword(user.password)
  const userCreated = await userRepository.registerUser({
    name: user.name,
    email: user.email,
    password: hashedPassword,
    userImage: user.userImage
  })
  const token = generateToken(userCreated)
  const newUser = await userRepository.getUserById(userCreated.id)
  return {
    user: newUser,
    token
  }
}

async function login (email, password) {
  const user =  await userRepository.getUserByEmail(email)
  if (!user){
    throw new NotFoundException('User not found')
  }
  
  const isSamePass = await comparePassword(password, user.password)
  if (!isSamePass) {
    throw new UnauthorizedException('email or password Invalid')
  }

  const token = generateToken(user)

  return normalizeUser(user, token)
    
}

async function getUserMe (userId) {
  const user = await userRepository.getUserById(userId)
  if (!user){
    throw new NotFoundException('User not found')
  }

  return user
}

async function updateUser (user, requesterId) {
  const fields = {}
  if (user.name !== undefined) fields.name = user.name
  if (user.userImage !== undefined) fields.userImage = user.userImage
  if (user.newEmail) fields.email = user.newEmail

  if (Object.keys(fields).length === 0) {
    throw new BadRequestException('Nothing to update')
  }

  const userUpdated = await userRepository.updateUser(requesterId, fields)
  const token = generateToken(userUpdated)

  return normalizeUser(userUpdated, token)
}

function normalizeUser (user, token) {
  return {
    formattedUser: {
      id: user.id,
      name: user.name,
      email: user.email,
      userImage: user.userImage,
      userReputation: user.userReputation,
      authorReputation: user.authorReputation
    },
    token
  }
}

export default {
  registerUser,
  login,
  getUserMe,
  updateUser
}

