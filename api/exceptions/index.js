import logger from "../logger.js";

const exceptionHandlers = {
  NotFoundException: (error) => ({ status: error.statusCode, message: error.message }),
  BadRequestException: (error) => ({ status: error.statusCode, message: error.message }),
  AlreadyExistException: (error) => ({ status: error.statusCode, message: error.message }),
  UnauthorizedException: (error) => ({ status: error.statusCode, message: error.message }),
  ForbiddenException: (error) => ({ status: error.statusCode, message: error.message }),
}

export default function exceptions (error, req, res, next) {
  logger.error(`Error processing request: ${req.method} - ${req.baseUrl} - ${error.message ?? JSON.stringify(error)}`)
  
  const handler = exceptionHandlers[error.constructor.name];
  if (handler) {
    const { status, message } = handler(error);
    return res.status(status).json({ error: message });
  }

  if (error.name === 'SequelizeUniqueConstraintError') {
    return res.status(409).json({ error: 'Resource already exists' })
  }

  if (error.name === 'SequelizeValidationError') {
    return res.status(400).json({ error: 'Invalid data' })
  }

  res.status(500).json({ error: 'Internal server error' })
}