import logger from "../logger.js";
import NotFoundException from "./NotFoundException.js";
import BadRequestException from "./BadRequestException.js";
import AlreadyExistException from './AlreadyExistException.js'

export default function exceptions (error, req, res, next) {
  logger.error(`Error processing request: ${req.method} - ${req.baseUrl} - ${error.message ?? JSON.stringify(error)}`)
  if (error instanceof NotFoundException) {
    return res.status(error.statusCode).json({ error: error.message });
  }
  if (error instanceof BadRequestException) {
    return res.status(error.statusCode).json({ error: error.message })
  }

  if (error instanceof AlreadyExistException) {
    return res.status(error.statusCode).json({ error: error.message })
  }

  res.status(500).send({ error: error.message ?? error })
}