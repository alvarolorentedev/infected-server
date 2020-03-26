import * as winston from 'winston'
import { Loggly } from 'winston-loggly-bulk'


const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
  });

  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
  
  if (process.env.NODE_ENV === 'production') {
    logger.add(new Loggly({
        subdomain: "appscat",
        inputToken: "0c03c7b1-8a72-4475-b2dc-15767502d500",
        tags: ['infecteed','server'],
        isBulk: true,
        stripColors: true
    }))
  }

  export default logger