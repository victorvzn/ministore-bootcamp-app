import { Router } from 'express'
import * as controllers from '../controllers/products.controller.js'

export const productsRouter = Router()

productsRouter.post(
  '/',
  controllers.createProduct
)

productsRouter.get(
  '/',
  controllers.listProducts
)