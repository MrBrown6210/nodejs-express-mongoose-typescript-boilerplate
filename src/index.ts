import app from './app'
import { APP_PORT } from '@/config'

app.listen(APP_PORT, () => {
  console.log(`listening ${APP_PORT}`)
})

console.log('testx')

process.on('SIGTERM', () => {
  console.log('SIGTERM')
})
