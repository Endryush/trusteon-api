import express from 'express';

const router = express.Router()

router
  .get('/', (req, res) => {
    try {
      res.status(200).send('Server is running')
    } catch (error) {
      logger.error(`error on get health-check ${error}`)
      res.status(500).send(`Error: ${error}`)
    }
  })

export default router