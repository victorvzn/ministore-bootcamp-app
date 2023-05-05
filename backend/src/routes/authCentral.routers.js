import { Router } from 'express'
import * as controllers from '../controllers/auth.controllers.js'
import { requestValidatorHandler } from '../middlewares/requestValidator.handler.js'
import { authLoginSchema, registerAuthSchema } from '../schemas/auth.schema.js'

export const authCentralRouter = Router()

authCentralRouter.post(
  '/register',
  requestValidatorHandler(registerAuthSchema, 'body'),
  controllers.authRegister
)

authCentralRouter.post(
  '/login',
  requestValidatorHandler(authLoginSchema, 'body'),
  controllers.authLogin
)
