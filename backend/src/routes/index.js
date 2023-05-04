import express from 'express'

import { authRouter } from './auth.routers.js'

import { enterprisesRouter } from './enterprises.routers.js'

import { categoriesRouter } from './categories.routers.js'
import { productsRouter } from './products.routers.js'
import { usersRouter } from './users.routers.js'

export function routerApiV1 (app) {
  const router = express.Router()

  app.use('/api/v1', router)

  router.use('/auth', authRouter)

  router.use('/enterprises', enterprisesRouter)
  
  router.use('/categories', categoriesRouter)
  router.use('/products', productsRouter)
  router.use('/users', usersRouter)
}
