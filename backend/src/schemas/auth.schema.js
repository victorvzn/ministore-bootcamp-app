import Joi from 'joi'

const id = Joi.string().uuid()
const email = Joi.string().min(1).max(25)
const password = Joi.string().min(1).max(25)

const name = Joi.string().min(2).max(25)
const firstname = Joi.string().min(2).max(25)
const lastname = Joi.string().min(2).max(25)
const phoneNumber = Joi.string().min(3).max(15)
const domain = Joi.string().min(3).max(15)
// const role = Joi.string().min(3).max(15)

export const authLoginSchema = Joi.object({
  email: email.required(),
  password: password.required(),
})

export const registerAuthSchema = Joi.object({
  name: name.required(),
  firstname: firstname.required(),
  lastname: lastname.required(),
  email: email.required(),
  password: password.required(),
  domain: domain.required()
})
