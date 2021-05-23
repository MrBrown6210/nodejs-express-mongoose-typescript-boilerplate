import mongoose from 'mongoose'
import app from './app'
import { APP_PORT, DB, DB_URI } from '@/config/config'
import logger from './config/logger'

const dbURI = DB_URI || `mongodb://${DB.USER}:${encodeURIComponent(DB.PASSWORD)}@${DB.HOST}:${DB.PORT}/${DB.NAME}`

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
