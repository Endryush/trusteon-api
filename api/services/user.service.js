import userRepository from "../repositories/user.repository.js";
import AlreadyExistException from '../exceptions/AlreadyExistException.js';
import NotFoundException from '../exceptions/NotFoundException.js';
import UnauthorizedException from '../exceptions/UnauthorizedException.js';
import  { hashPassword, comparePassword, generateToken } from '../utils/bcrypt.js';

async function registerUser (user) {
  const alreadyIsUser = await userRepository.getUserByEmail(user.email);
  if (alreadyIsUser) {
    throw new AlreadyExistException('User already exists');
  }
    
  const hashedPassword = await hashPassword(user.password)
  const userCreated = await userRepository.registerUser({ ...user, password: hashedPassword })
  const token = generateToken(userCreated)

  return {
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

export default {
  registerUser,
  login
}

