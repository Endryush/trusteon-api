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
export default {
  registerUser
}