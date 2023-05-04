import Joi from 'joi'

const id = Joi.string().alphanum()
const name = Joi.string().min(1).max(25)
const active = Joi.boolean()

export const createCategorySchema = Joi.object({
  name: name.required(),

  active
})

export const getCategorySchema = Joi.object({
  id: id.required()
})

export const updateCategorySchema = Joi.object({
  name,

  active
})