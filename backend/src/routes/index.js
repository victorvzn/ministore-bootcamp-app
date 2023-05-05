import express from 'express'

import { authCentralRouter } from './authCentral.routers.js'
import { authStoreRouter } from './authStore.routers.js'
import { enterprisesRouter } from './enterprises.routers.js'

import { categoriesRouter } from './categories.routers.js'
import { productsRouter } from './products.routers.js'
import { usersRouter } from './users.routers.js'
import { imagesRouter } from './images.routers.js'

export function routerApiV1 (app) {
  const router = express.Router()

  app.use('/api/v1', router)

  router.use('/central/auth', authCentralRouter)
  router.use('/auth', authStoreRouter)

  router.use('/enterprises', enterprisesRouter)
  
  router.use('/categories', categoriesRouter)
  router.use('/products', productsRouter)
  router.use('/users', usersRouter)

  router.use('/images', imagesRouter)
}
