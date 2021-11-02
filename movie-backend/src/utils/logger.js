const winston = require('winston');
const ecsFormat = require('@elastic/ecs-winston-format');

const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.File({
      filename: 'logs/logs.json',
      level: 'debug'
    })
  ],
  format: ecsFormat({ convertReqRes: true }),
});

// Simple express middleware for request logging.
function expressRequestLogger (opts) {
  const logger = opts.logger

  return function (req, res, next) {
    function onResDone (err) {
      this.removeListener('finish', onResDone)
      this.removeListener('error', onResDone)
      logger.info(`handled ${req.method} ${req.baseUrl}`, { req, res, err })
    }
    res.on('finish', onResDone)
    res.on('error', onResDone)
    next()
  }
}

// Simple express middleware for error logging.
function expressErrorLogger (opts) {
  const logger = opts.logger

  return function (err, req, _res, next) {
    // TODO: error formatting `convertErr`
    logger.info(`error handling ${req.method} ${req.path}`, { err })
    next(err)
  }
}

module.exports.logger = logger;
module.exports.expressRequestLogger = expressRequestLogger;
module.exports.expressErrorLogger = expressErrorLogger;
