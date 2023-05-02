import Joi from 'joi'

const id = Joi.string().uuid()
const name = Joi.string().min(2).max(25)
const firstname = Joi.string().min(2).max(25)
const lastname = Joi.string().min(2).max(25)
const phoneNumber = Joi.string().min(3).max(15)
const email = Joi.string().email()
const password = Joi.string().min(8)
const domain = Joi.string().min(3).max(15)
// const role = Joi.string().min(3).max(15)

export const registerEnterpriseSchema = Joi.object({
  name: name.required(),
  firstname: firstname.required(),
  lastname: lastname.required(),
  email: email.required(),
  password: password.required(),
  domain: domain.required()
})
