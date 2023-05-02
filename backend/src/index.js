import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { logErrors, boomErrorHandler, errorHandler } from './middlewares/error.handler.js'

import { routerApiV1 } from './routes/index.js'

dotenv.config()

const app = express()

const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => res.json({ message: 'Welcome to the Ministore' }))

routerApiV1(app)

// Middlewares
app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`)
})