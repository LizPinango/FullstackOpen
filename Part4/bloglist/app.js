const express = require('express')
const app = express()
require('express-async-errors')
const cors = require('cors')
const mongoose = require('mongoose')

const logger = require('./utils/logger'); //the console.logs
const config = require('./utils/config'); //env variables 
const middleware = require('./utils/middleware'); // middleware
const blogsRouter = require('./controllers/blogs'); //rutas de los blogs
const usersRouter = require('./controllers/users'); //rutas de los usuarios

mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch(error => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger) // request info

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

app.use(middleware.errorHandler) // Handler errors 

module.exports = app