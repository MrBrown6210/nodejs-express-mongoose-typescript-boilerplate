export const ENVIRONMENT = process.env.APP_ENV || 'dev'
export const IS_PRODUCTION = ENVIRONMENT === 'production'
export const IS_TEST = ENVIRONMENT === 'test'
export const APP_PORT = Number(process.env.APP_PORT) || 9000
export const APP_PREFIX_PATH = process.env.APP_PREFIX_PATH || '/'
export const DB = {
  USER: process.env.DB_USER || 'root',
  PASSWORD: process.env.DB_USER_PWD || 'secret',
  HOST: process.env.DB_HOST || 'localhost',
  NAME: process.env.DB_NAME || 'conduit',
  PORT: Number(process.env.DB_PORT) || 27017,
}
export const DB_URI = process.env.DB_URI || `mongodb://localhost:27017/Mocks${IS_TEST ? '-test' : ''}`
