import { Router } from 'express'
import * as controllers from '../controllers/enterprises.controllers.js'
import { validateToken } from '../middlewares/validateToken.js'

export const enterprisesRouter = Router()

enterprisesRouter.get(
  '/',
  validateToken,
  controllers.listEnterprises
)