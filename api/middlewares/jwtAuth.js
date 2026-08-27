import { verifyToken } from '../utils/bcrypt.js'
import UnauthorizedException from '../exceptions/UnauthorizedException.js'

export default function jwtAuth (req, res, next) {
  try {
    const { authorization } = req.headers
    if (!authorization) throw new UnauthorizedException('Missing Authorization')

    const token = authorization.split(' ')[1]
    if (!token) throw new UnauthorizedException('Token is required.')

    const decoded = verifyToken(token)
    req.user = {
      id: decoded.id,
      email: decoded.email
    }
    next()
  } catch (error) {
    next(error)
  }
}
