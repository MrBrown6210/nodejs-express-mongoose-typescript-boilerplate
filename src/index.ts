import app from './app'

app.listen(9000, () => {
  console.log('listening 9000')
})

process.on('SIGTERM', () => {
  console.log('SIGTERM')
})
