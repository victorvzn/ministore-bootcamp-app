import { Router } from 'express'
import * as controllers from '../controllers/enterprises.controller.js'
import { requestValidatorHandler } from '../middlewares/requestValidator.handler.js'
import { registerEnterpriseSchema } from '../schemas/enterprise.schema.js'

export const enterprisesRouter = Router()

enterprisesRouter.post(
  '/register',
  requestValidatorHandler(registerEnterpriseSchema, 'body'),
  controllers.registerEnterprise
)

enterprisesRouter.get(
  '/',
  controllers.listEnterprises
)