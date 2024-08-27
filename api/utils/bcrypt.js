import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function hashPassword (password)  {
  const salt = await bcrypt.genSalt(10);

  return await bcrypt.hash(password, salt);
};

export async function comparePassword (password, hash) {
  return await bcrypt.compare(password, hash);
};

export function generateToken (id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '24h' })
}