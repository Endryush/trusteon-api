import winston from 'winston'

const { combine, timestamp, label, printf } = winston.format
const formatLog = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level} ${message}`
})

const isServerless = Boolean(process.env.VERCEL) || process.env.NODE_ENV === 'production'

const transports = [new winston.transports.Console()]
if (!isServerless) {
  transports.push(new winston.transports.File({ filename: 'trusteon-api.log' }))
}

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL ?? 'info',
  transports,
  format: combine(
    label({ label: 'Trusteon API' }),
    timestamp(),
    formatLog
  )
})

export default logger
