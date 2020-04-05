import * as winston from 'winston'
import { Loggly } from 'winston-loggly-bulk'


const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
  })

  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }))

  if (process.env.NODE_ENV === 'production') {
    logger.add(new Loggly({
        subdomain: process.env.LOGS_SUBDOMAIN,
        inputToken: process.env.LOGS_INPUT_TOKEN,
        tags: ['infecteed','server'],
        isBulk: true,
        stripColors: true
    }))
  }

  export default logger