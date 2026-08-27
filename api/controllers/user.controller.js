import userService from "../services/user.service.js"
import { validateUser } from "../helpers/validateUserRequest.js";

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
    res.send(await userService.getUserMe(req.user.id))
  } catch (error) {
    next(error)
  }
}

async function updateUser (req, res, next) {
  try {
    const user = await userService.updateUser(req.body, req.user.id)
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