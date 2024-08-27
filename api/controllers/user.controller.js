import userService from "../services/user.service.js"
import NotFoundException from "../exceptions/NotFoundException.js";
import { validateUser } from "../helpers/validateUserRequest.js";

async function registerUser (req, res, next) {
  try {
    const user = req.body
    validateUser(user)
    const userCreated = await userService.registerUser(user)

    res.header('Authorization', `Bearer ${userCreated.token}`)
    res.status(201).send()
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
export default {
  registerUser,
  login
}