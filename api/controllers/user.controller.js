import userService from "../services/user.service.js"
import { validateUser } from "../helpers/validateUserRequest.js";
import UnauthorizedException from "../exceptions/UnauthorizedException.js";

async function registerUser (req, res, next) {
  try {
    const user = req.body
    validateUser(user)
    const userCreated = await userService.registerUser(user)

    res.header('Authorization', `Bearer ${userCreated.token}`)
    res.status(201).send(userCreated.user)
    logger.info('POST IN registerUser')
  } catch (error) {
    next(error)
  }
}

async function login (req, res, next) {
  try {
    const { email, password } = req.body
    const user = await userService.login(email, password)
    res.header('Authorization', `Bearer ${user.token}`)
    res.status(200).send(user.formattedUser)
    logger.info('POST IN login')
  } catch (error) {
    next(error)
  }
}

async function getUserMe (req, res, next) {
  try {
    const { authorization  } = req.headers

    if (!authorization ) throw new UnauthorizedException('Missing Authorization')

    const token = authorization .split(' ')[1]
    res.header('Authorization', `Bearer ${token}`)
    res.send(await userService.getUserMe(token))
  } catch (error) {
    next(error)
  }
}

async function updateUser (req, res, next) {
  try {
    const user = await userService.updateUser(req.body)
    res.header('Authorization', `Bearer ${user.token}`)
    res.send(user.formattedUser)
    logger.info('PATCH IN updateUser')
  } catch (error) {
    next(error)
  }
}

export default {
  registerUser,
  login,
  getUserMe,
  updateUser
}