const app = require('./app')
const logger = require('./utils/logger'); //the console.logs
const config = require('./utils/config'); //env variables 

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})