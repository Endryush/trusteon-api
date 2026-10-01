import express from "express";
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import swaggerUi from 'swagger-ui-express'
import routes from './routes/index.js'
import exceptions from './exceptions/index.js'
import swaggerSpec from './docs/swagger.js'

const app = express()
app.set('trust proxy', 1)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false
})

app
  .use(helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: false
  }))
  .use(express.json())
  .use(cors({
    origin: '*',
    exposedHeaders: ['Authorization'],
  }))
  .use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customSiteTitle: 'Trusteon API Docs'
  }))
  .use('/api/user/register', authLimiter)
  .use('/api/user/login', authLimiter)
  .use('/api', routes)
  .use(exceptions)

export default app
