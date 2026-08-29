import BadRequestException from '../exceptions/BadRequestException.js'

function formatIssues (error) {
  return error.issues.map((issue) => {
    const path = issue.path.length > 0 ? issue.path.join('.') : 'body'
    return `${path}: ${issue.message}`
  }).join('; ')
}

export function validateBody (schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body)
    if (!result.success) {
      return next(new BadRequestException(formatIssues(result.error)))
    }
    req.body = result.data
    next()
  }
}

export function validateQuery (schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.query)
    if (!result.success) {
      return next(new BadRequestException(formatIssues(result.error)))
    }
    req.query = result.data
    next()
  }
}

export function validateParams (schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.params)
    if (!result.success) {
      return next(new BadRequestException(formatIssues(result.error)))
    }
    req.params = result.data
    next()
  }
}
