import express from 'express'
import helmet from 'helmet'
// import xss from 'xss-clean'
import mongoSanitize from 'express-mongo-sanitize'
import compression from 'compression'
import cors from 'cors'
import routes from '@/routes'
import { successHandler, errorHandler } from '@/config/morgan'
import { IS_TEST } from '@/config/config'

const app = express()

if (!IS_TEST) {
  app.use(successHandler)
  app.use(errorHandler)
}

// set security HTTP headers
app.use(helmet())

// parse json request body
app.use(express.json())

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }))

// sanitize request data
// app.use(xss())
app.use(mongoSanitize())

// gzip compression
app.use(compression())

app.use(cors())

app.get('/', (req, res) => {
  res.send('Healthy')
})

app.use(routes)

export default app
