import express from 'express'
import db from '../config/db.js'
import logger from '../logger.js'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    await db.authenticate()
    res.status(200).json({ status: 'ok' })
  } catch (error) {
    logger.error(`health-check failed: ${error.message}`)
    res.status(503).json({ status: 'error' })
  }
})

export default router
