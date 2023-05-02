// SEE: https://expressjs.com/es/guide/error-handling.html
// SEE: https://github.com/victorvzn/learning-nodejs/blob/main/api/middlewares/error.handler.js

export function logErrors (err, req, res, next) {
  console.error(err)

  next(err)
}

export function errorHandler (err, req, res, next) {
  const { message, stack } = err

  res.status(500)

  res.json({ message, stack })
}

export function boomErrorHandler (err, req, res, next) {
  if (err.isBoom) {
    const { statusCode, payload } = err.output

    return res.status(statusCode).json(payload)
  }
  next(err)
}