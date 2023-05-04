import { Router } from 'express'
import * as controllers from '../controllers/users.controllers.js'
import { requestValidatorHandler } from '../middlewares/requestValidator.handler.js'
import { createUserSchema, getUserSchema, updateUserSchema } from '../schemas/users.schemas.js'
import { validateToken } from '../middlewares/validateToken.js'

export const usersRouter = Router()

usersRouter.post(
  '/',
  requestValidatorHandler(createUserSchema, 'body'),
  validateToken,
  controllers.createUser
)

usersRouter.get(
  '/',
  validateToken,
  controllers.listUsers
)

usersRouter.get(
  '/:id',
  requestValidatorHandler(getUserSchema, 'params'),
  validateToken,
  controllers.getUser
)

usersRouter.put(
  '/:id',
  requestValidatorHandler(getUserSchema, 'params'),
  requestValidatorHandler(updateUserSchema, 'body'),
  validateToken,
  controllers.updateUser
)

usersRouter.delete(
  '/:id',
  requestValidatorHandler(getUserSchema, 'params'),
  validateToken,
  controllers.deleteUser
)