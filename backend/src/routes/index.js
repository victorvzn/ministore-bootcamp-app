import express from 'express'

import { enterprisesRouter } from './enterprises.router.js'
import { categoriesRouter } from './categories.router.js'
import { productsRouter } from './products.router.js'
import { authRouter } from './auth.routers.js'

export function routerApiV1 (app) {
  const router = express.Router()

  app.use('/api/v1', router)

  router.use('/auth', authRouter)

  router.use('/enterprises', enterprisesRouter)
  
  router.use('/categories', categoriesRouter)
  router.use('/products', productsRouter)
}
