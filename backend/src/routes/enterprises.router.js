import { Router } from 'express'
import * as controllers from '../controllers/enterprises.controller.js'
import { requestValidatorHandler } from '../middlewares/requestValidator.handler.js'
import { createEnterpriseSchema } from '../schemas/enterprise.schema.js'

export const enterprisesRouter = Router()

enterprisesRouter.post(
  '/',
  requestValidatorHandler(createEnterpriseSchema, 'body'),
  controllers.createEnterprise
)

enterprisesRouter.get(
  '/',
  controllers.listEnterprises
)