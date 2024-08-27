import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userRepository from "../repositories/user.repository.js";
import AlreadyExistException from '../exceptions/AlreadyExistException.js';

async function registerUser (user) {
  const alreadyIsUser = await userRepository.getUserByEmail(user.email);
  if (alreadyIsUser) {
    throw new AlreadyExistException('User already exists');
  }
    
  const hashedPassword = await hashPassword(user.password)
  const userCreated = await userRepository.registerUser({ ...user, password: hashedPassword })
  const token = jwt.sign({ id: userCreated.id }, process.env.JWT_SECRET, { expiresIn: '24h' })

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

export default {
  registerUser
}

