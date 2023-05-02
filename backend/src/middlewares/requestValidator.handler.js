import boom from '@hapi/boom'

// SEE: https://softchris.github.io/pages/joi.html#building-a-middleware
// SEE: https://joi.dev/api/?v=17.9.1

export const requestValidatorHandler = (schema, property) => {
  // propert === req.body, req.params, req.query

  return (req, res, next) => {
    const value = req[property]

    const options = {
      abortEarly: false // when true, stops validation on the first error, otherwise returns all the errors found
    }

    const { error } = schema.validate(value, options)

    if (error) next(boom.badRequest(error))

    next()
  }
}