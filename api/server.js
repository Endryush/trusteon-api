import express from "express";
import cors from 'cors'
import routes from './routes/index.js'
import exceptions from './exceptions/index.js'

const app = express()

app
  .use(express.json())
  .use(cors())
  .use('/api', routes)
  .use(exceptions)

export default app