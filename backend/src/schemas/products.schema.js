import Joi from 'joi'

const id = Joi.string().alphanum()

const name = Joi.string().min(1).max(30)
const price = Joi.number().min(0)
const categoryId = Joi.string()

const description = Joi.string()
const code = Joi.string()
const discountPercentage = Joi.string()
const stock = Joi.number().min(0)
const brand = Joi.string()
const thumbnail = Joi.string()
const images = Joi.array().items(Joi.string())
const sizes = Joi.array().items(Joi.string())
const colors = Joi.array().items(Joi.string())
const published = Joi.boolean()
const active = Joi.boolean()

export const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  categoryId: categoryId.required(),

  description,
  code,
  discountPercentage,
  stock,
  brand,
  thumbnail,
  images,
  sizes,
  colors,
  published,
  active
})

export const getProductSchema = Joi.object({
  id: id.required()
})

export const updateProductSchema = Joi.object({
  name,
  price,
  categoryId,

  description,
  code,
  discountPercentage,
  stock,
  brand,
  thumbnail,
  images,
  sizes,
  colors,
  published,
  active
})