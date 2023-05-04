import Joi from 'joi'

const id = Joi.string().alphanum()

const firstname = Joi.string().min(1).max(25)
const lastname = Joi.string().min(1).max(25)
const phoneNumber = Joi.string().min(3).max(15)
const address = Joi.string().min(3).max(50)
const email = Joi.string().min(1).max(25)
const password = Joi.string().min(1).max(25)
const active = Joi.boolean()

export const createUserSchema = Joi.object({
  firstname: firstname.required(),
  lastname: lastname.required(),
  phoneNumber: phoneNumber.required(),
  address: address.required(),
  email: email.required(),
  password: password.required(),

  active
})

export const getUserSchema = Joi.object({
  id: id.required()
})

export const updateUserSchema = Joi.object({
  firstname,
  lastname,
  phoneNumber,
  address,
  email,

  active
})