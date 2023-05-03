import Joi from 'joi'

const id = Joi.string().uuid()
const email = Joi.string().min(1).max(25)
const password = Joi.string().min(1).max(25)

export const authLoginSchema = Joi.object({
  email: email.required(),
  password: password.required(),
})
