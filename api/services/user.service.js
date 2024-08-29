import userRepository from "../repositories/user.repository.js";
import AlreadyExistException from '../exceptions/AlreadyExistException.js';
import NotFoundException from '../exceptions/NotFoundException.js';
import UnauthorizedException from '../exceptions/UnauthorizedException.js';
import  { hashPassword, comparePassword, generateToken, decodeToken } from '../utils/bcrypt.js';

async function registerUser (user) {
  const alreadyIsUser = await userRepository.getUserByEmail(user.email);
  if (alreadyIsUser) {
    throw new AlreadyExistException('User already exists');
  }
    
  const hashedPassword = await hashPassword(user.password)
  const userCreated = await userRepository.registerUser({ ...user, password: hashedPassword })
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

  return {
    formattedUser: {
      name: user.name,
      email: user.email
    },
    token
  }
    
}

async function getUserMe (token) {
  const decodedToken = decodeToken(token)
  const user = await userRepository.getUserById(decodedToken.id)
  if (!user){
    throw new NotFoundException('User not found')
  }

  return user
}

export default {
  registerUser,
  login,
  getUserMe
}

