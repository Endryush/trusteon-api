import './config/dotenv.js'
import server from './server.js'
import db from './config/db.js'
import logger from './logger.js'

const port = process.env.PORT || 3000

export default server

if (!process.env.VERCEL) {
  const httpServer = server.listen(port, () => {
    logger.info(`API started on port ${port}`)
  })

  const shutdown = async () => {
    httpServer.close()
    await db.close()
    process.exit(0)
  }

  process.on('SIGTERM', shutdown)
  process.on('SIGINT', shutdown)
}
