import { Router } from 'express'
import * as controllers from '../controllers/auth.controllers.js'
import { requestValidatorHandler } from '../middlewares/requestValidator.handler.js'
import { authLoginSchema, registerAuthSchema } from '../schemas/auth.schema.js'

export const authRouter = Router()

authRouter.post(
  '/register',
  requestValidatorHandler(registerAuthSchema, 'body'),
  controllers.authRegister
)

authRouter.post(
  '/login',
  requestValidatorHandler(authLoginSchema, 'body'),
  controllers.authLogin
)
