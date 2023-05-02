import express from 'express'

import { enterprisesRouter } from './enterprises.router.js'
import { categoriesRouter } from './categories.router.js'
import { productsRouter } from './products.router.js'

export function routerApi (app) {
  const router = express.Router()

  app.use('/api/v1', router)

  router.use('/enterprises', enterprisesRouter)
  router.use('/categories', categoriesRouter)
  router.use('/products', productsRouter)
}
