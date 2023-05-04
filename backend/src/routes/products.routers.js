import { Router } from 'express'
import * as controllers from '../controllers/products.controllers.js'
import { requestValidatorHandler } from '../middlewares/requestValidator.handler.js'
import { createProductSchema, getProductSchema, updateProductSchema } from '../schemas/products.schema.js'
import { validateToken } from '../middlewares/validateToken.js'
import { validateDomain } from '../middlewares/validateDomain.js'

export const productsRouter = Router()

productsRouter.post(
  '/',
  requestValidatorHandler(createProductSchema, 'body'),
  validateToken,
  controllers.createProduct
)

productsRouter.get(
  '/',
  validateToken,
  controllers.listProducts
)

productsRouter.get(
  '/store',
  validateDomain,
  controllers.listProductsByStore
)

productsRouter.get(
  '/:id',
  requestValidatorHandler(getProductSchema, 'params'),
  validateToken,
  controllers.getProduct
)

productsRouter.put(
  '/:id',
  requestValidatorHandler(getProductSchema, 'params'),
  requestValidatorHandler(updateProductSchema, 'body'),
  validateToken,
  controllers.updateProduct
)

productsRouter.delete(
  '/:id',
  requestValidatorHandler(getProductSchema, 'params'),
  validateToken,
  controllers.deleteProduct
)