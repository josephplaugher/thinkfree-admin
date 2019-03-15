const winston = require('winston');

const logger = winston.createLogger({
    level: 'error',
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: './src/server/thinkfree-admin.log' })
    ]
  });

const log = function(e,msg) {
  if(process.env.NODE_ENV === 'development') { 
      if(e) { console.error(e.stack) }
    }
      logger.log('error', e, 'message', msg)
    }
  
module.exports = log;