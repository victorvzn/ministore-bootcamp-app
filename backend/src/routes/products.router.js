import { Router } from 'express'
import * as controllers from '../controllers/products.controller.js'
import { requestValidatorHandler } from '../middlewares/requestValidator.handler.js'
import { createProductSchema } from '../schemas/products.schema.js'
import { validateToken } from '../middlewares/validateToken.js'

export const productsRouter = Router()

productsRouter.post(
  '/',
  requestValidatorHandler(createProductSchema, 'body'),
  validateToken,
  controllers.createProduct
)

productsRouter.get(
  '/',
  controllers.listProducts
)