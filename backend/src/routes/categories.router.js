import { Router } from 'express'
import * as controllers from '../controllers/categories.controller.js'
import { requestValidatorHandler } from '../middlewares/requestValidator.handler.js'
import { createCategorySchema } from '../schemas/categories.schema.js'
import { validateToken } from '../middlewares/validateToken.js'

export const categoriesRouter = Router()

categoriesRouter.post(
  '/',
  requestValidatorHandler(createCategorySchema, 'body'),
  validateToken,
  controllers.createCategory
)

categoriesRouter.get(
  '/',
  controllers.listCategories
)