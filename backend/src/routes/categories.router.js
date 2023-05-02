import { Router } from 'express'
import * as controllers from '../controllers/categories.controller.js'

export const categoriesRouter = Router()

categoriesRouter.post(
  '/',
  controllers.createCategory
)

categoriesRouter.get(
  '/',
  controllers.listCategories
)