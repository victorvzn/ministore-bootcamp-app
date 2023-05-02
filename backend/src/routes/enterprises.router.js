import { Router } from 'express'
import * as controllers from '../controllers/enterprises.controller.js'

export const enterprisesRouter = Router()

enterprisesRouter.post(
  '/',
  controllers.createEnterprise
)

enterprisesRouter.get(
  '/',
  controllers.listEnterprises
)