import Joi from 'joi'

const id = Joi.string().uuid()
const name = Joi.string().min(1).max(25)

export const createCategorySchema = Joi.object({
  name: name.required(),
})
