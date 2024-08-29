import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UnauthorizedException from '../exceptions/UnauthorizedException.js';

export async function hashPassword (password)  {
  const salt = await bcrypt.genSalt(10);

  return await bcrypt.hash(password, salt);
};

export async function comparePassword (password, hash) {
  return await bcrypt.compare(password, hash);
};

export function generateToken (user) {
  return jwt.sign({ id: user.id, email: user.email  }, process.env.JWT_SECRET, { expiresIn: '24h' })
}

export function decodeToken (token) {
  try {
    return jwt.decode(token)
  } catch (error) {
    throw new UnauthorizedException('Invalid token')
  }
}