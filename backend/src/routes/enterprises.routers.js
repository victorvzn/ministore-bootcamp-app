import { Router } from 'express'
import * as controllers from '../controllers/enterprises.controllers.js'

export const enterprisesRouter = Router()

enterprisesRouter.get(
  '/',
  controllers.listEnterprises
)