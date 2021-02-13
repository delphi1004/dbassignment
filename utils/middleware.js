const logger = require('./logger')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('--------------------------------')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.name)
  
  if (error.name === 'SyntaxError') {
    return response.status(400).send({ error: 'data format syntax error' })
  }

  response.status(500)
  response.render('error', { error: error.name })

  next(error) 
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
}