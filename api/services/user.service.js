import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userRepository from "../repositories/user.repository.js";
import AlreadyExistException from '../exceptions/AlreadyExistException.js';
import NotFoundException from '../exceptions/NotFoundException.js';
import UnauthorizedException from '../exceptions/UnauthorizedException.js';

async function registerUser (user) {
  const alreadyIsUser = await userRepository.getUserByEmail(user.email);
  if (alreadyIsUser) {
    throw new AlreadyExistException('User already exists');
  }
    
  const hashedPassword = await hashPassword(user.password)
  const userCreated = await userRepository.registerUser({ ...user, password: hashedPassword })
  const token = generateToken(userCreated.id)

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

  const token = generateToken(user.id)

  return {
    token
  }
    
}

async function hashPassword (password)  {
  const salt = await bcrypt.genSalt(10);

  return await bcrypt.hash(password, salt);
};

async function comparePassword (password, hash) {
  return await bcrypt.compare(password, hash);
};

function generateToken (id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '24h' })
}

export default {
  registerUser,
  login
}

