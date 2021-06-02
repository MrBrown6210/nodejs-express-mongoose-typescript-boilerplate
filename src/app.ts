import express from 'express'
import helmet from 'helmet'
// import xss from 'xss-clean'
import mongoSanitize from 'express-mongo-sanitize'
import compression from 'compression'
import cors from 'cors'
import routes from '@/routes'
import { morganSuccessHandler, morganErrorHandler } from '@/config/morgan'
import { IS_TEST, APP_PREFIX_PATH } from '@/config/config'
import httpStatus from 'http-status'
import ApiError from './utils/ApiError'
import { errorConverter, errorHandler } from './middlewares/error'
import passport from 'passport'
import { anonymousStrategy, jwtStrategy } from '@/config/passport'
import swaggerUi from 'swagger-ui-express'

const app = express()

app.use(passport.initialize())
passport.use(jwtStrategy)
passport.use(anonymousStrategy)

if (!IS_TEST) {
  app.use(morganSuccessHandler)
  app.use(morganErrorHandler)
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

app.get('/', (_req, res) => {
  res.send('Healthy')
})

app.use(APP_PREFIX_PATH, routes)

// send back a 404 error for any unknown api request
app.use((_req, _res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'))
})

// convert error to ApiError, if needed
app.use(errorConverter)

// handle error
app.use(errorHandler)

export default app
