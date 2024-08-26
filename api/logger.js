import winston from 'winston'

const { combine, timestamp, label, printf } = winston.format
const formatLog = printf(({level, message, label, timestamp}) => {
  return `${timestamp} [${label}] ${level} ${message}`
})

global.logger = winston.createLogger({
  level: 'silly',
  transports: [
    new (winston.transports.Console)(),
    new (winston.transports.File)({ filename: 'trusteon-api.log' })
  ],
  format: combine(
    label({ label: 'Trusteon API'}),
    timestamp(),
    formatLog
  )
})

export default global.logger



