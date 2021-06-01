import logger from '@/config/logger'
import { Store } from '@/models/store.model'
import { User } from '@/models/user.model'
import ApiError from '@/utils/ApiError'
import express from 'express'
import httpStatus from 'http-status'

const router = express.Router()

router.post('/login', async (req, res, next) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (!user || !user.validPassword(password)) return res.sendStatus(httpStatus.UNPROCESSABLE_ENTITY)
  res.json(user.toAuthJSON())
})

router.post('/register', async (req, res, next) => {
  try {
    const { first_name, last_name, email, password } = req.body
    const user = new User()
    user.first_name = first_name
    user.last_name = last_name
    user.email = email
    user.setPassword(password)
    await user.save()
    res.json(user.toAuthJSON())
  } catch (e) {
    if (e.name === 'MongoError') return res.status(httpStatus.BAD_REQUEST).send(e)
    next(e)
  }
})

router.get('/me', async (req, res, next) => {
  res.send('wow')
})

export default router
