import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import { routerApi } from './routes/index.js'

dotenv.config()

const app = express()

const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => res.json({ message: 'Welcome to the Ministore' }))

routerApi(app)

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`)
})