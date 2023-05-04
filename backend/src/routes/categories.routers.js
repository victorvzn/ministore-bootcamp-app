import { Router } from 'express'
import * as controllers from '../controllers/categories.controllers.js'
import { requestValidatorHandler } from '../middlewares/requestValidator.handler.js'
import { createCategorySchema, getCategorySchema, updateCategorySchema } from '../schemas/categories.schema.js'
import { validateToken } from '../middlewares/validateToken.js'
import { validateDomain } from '../middlewares/validateDomain.js'

export const categoriesRouter = Router()

categoriesRouter.post(
  '/',
  requestValidatorHandler(createCategorySchema, 'body'),
  validateToken,
  controllers.createCategory
)

categoriesRouter.get(
  '/',
  validateToken,
  controllers.listCategories
)

categoriesRouter.get(
  '/store',
  validateDomain,
  controllers.listCategoriesByStore
)

categoriesRouter.get(
  '/:id',
  requestValidatorHandler(getCategorySchema, 'params'),
  validateToken,
  controllers.getCategory
)

categoriesRouter.put(
  '/:id',
  requestValidatorHandler(getCategorySchema, 'params'),
  requestValidatorHandler(updateCategorySchema, 'body'),
  validateToken,
  controllers.updateCategory
)

categoriesRouter.delete(
  '/:id',
  requestValidatorHandler(getCategorySchema, 'params'),
  validateToken,
  controllers.deleteCategory
)