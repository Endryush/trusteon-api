import logger from "../logger.js";

const exceptionHandlers = {
  NotFoundException: (error) => ({ status: error.statusCode, message: error.message }),
  BadRequestException: (error) => ({ status: error.statusCode, message: error.message }),
  AlreadyExistException: (error) => ({ status: error.statusCode, message: error.message }),
  UnauthorizedException: (error) => ({ status: error.statusCode, message: error.message }),
}

export default function exceptions (error, req, res, next) {
  logger.error(`Error processing request: ${req.method} - ${req.baseUrl} - ${error.message ?? JSON.stringify(error)}`)
  
  const handler = exceptionHandlers[error.constructor.name];
  if (handler) {
    const { status, message } = handler(error);
    return res.status(status).json({ error: message });
  }

  res.status(500).send({ error: error.message ?? error })
}