import logger from "../logger.js";
import NotFoundException from "./NotFoundException.js";

export default function exceptions (error, req, res, next) {
  logger.error(`Error processing request: ${req.method} - ${req.baseUrl} - ${error.message ?? JSON.stringify(error)}`)
  if (error instanceof NotFoundException) {
    return res.status(error.statusCode).json({ error: error.message });
  }
  res.status(400).send({ error: error.message ?? error })
}