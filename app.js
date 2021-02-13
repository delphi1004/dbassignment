const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const analyserRouter = require('./controllers/analyser')
const healthRouter = require('./controllers/health')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')

logger.info('DB assignment project is starting...')

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/analyse', analyserRouter)
app.use('/health', healthRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app