import { Router } from 'express'
import * as controllers from '../controllers/auth.controllers.js'
import { requestValidatorHandler } from '../middlewares/requestValidator.handler.js'
import { authLoginSchema } from '../schemas/auth.schema.js'

export const authRouter = Router()

authRouter.post(
  '/login',
  requestValidatorHandler(authLoginSchema, 'body'),
  controllers.authLogin
)
