import mongoose from 'mongoose'
import app from './app'
import { APP_PORT, DB, DB_URI, IS_TEST } from '@/config/config'
import logger from './config/logger'

let dbURI: string
if (DB.HOST && DB.NAME && DB.PASSWORD && DB.USER) {
  dbURI = `mongodb://${DB.USER}:${encodeURIComponent(DB.PASSWORD)}@${DB.HOST}:${DB.PORT}/${DB.NAME}`
} else {
  dbURI = DB_URI
}

if (IS_TEST) {
  dbURI += '-test'
}

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  autoIndex: true,
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0,
  connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
}

logger.debug(dbURI)
logger.info('connecting to database...')

mongoose
  .connect(dbURI, options)
  .then(() => {
    logger.info('Mongoose connection done')
    app.listen(APP_PORT, () => {
      logger.info(`server listening on ${APP_PORT}`)
    })
  })
  .catch((e) => {
    logger.info('Mongoose connection error')
    logger.error(e)
  })

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', () => {
  logger.debug('Mongoose default connection open to ' + dbURI)
})

// If the connection throws an error
mongoose.connection.on('error', (err) => {
  logger.error('Mongoose default connection error: ' + err)
})

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
  logger.info('Mongoose default connection disconnected')
})

// If the Node process ends, close the Mongoose connection (ctrl + c)
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    logger.info('Mongoose default connection disconnected through app termination')
    process.exit(0)
  })
})

process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception: ' + err)
})
