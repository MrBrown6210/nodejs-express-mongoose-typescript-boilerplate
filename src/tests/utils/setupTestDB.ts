import mongoose from 'mongoose'
import { DB_SERVER, DB_NAME } from '../../config/config'
import logger from '@/config/logger'

const DB_URI = `${DB_SERVER}${DB_NAME}-test`

const setupTestDB = () => {
  beforeAll(async () => {
    logger.debug(`Connecting to ${DB_URI}`)
    await mongoose.connect(DB_URI, {
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
    })
  })

  beforeEach(async () => {
    await Promise.all(
      Object.values(mongoose.connection.collections).map(async (collection) => collection.deleteMany({})),
    )
  })

  afterAll(async () => {
    await mongoose.disconnect()
  })
}

export default setupTestDB
