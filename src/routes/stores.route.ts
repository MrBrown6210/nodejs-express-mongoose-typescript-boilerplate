import logger from '@/config/logger'
import { Store } from '@/models/store.model'
import ApiError from '@/utils/ApiError'
import express from 'express'
import httpStatus from 'http-status'
import { authenticate } from 'passport'

const router = express.Router()

router.get('/', authenticate(['jwt', 'anonymous'], { session: false }), async (req, res, next) => {
  // logger.debug('%o', req.user)
  const store = await Store.find()
  res.json(store)
})

router.get('/:id', async (req, res, next) => {
  try {
    const store = await Store.findOne({ _id: req.params.id })
    if (!store) throw new ApiError(httpStatus.NOT_FOUND, 'Store not found')
    res.json(store)
  } catch (e) {
    next(e)
  }
})

router.post('/', authenticate(['jwt'], { session: false }), async (req, res, next) => {
  try {
    const store = new Store(req.body.store)
    await store.save()
    res.json(store)
  } catch (e) {
    next(e)
  }
})

router.patch('/:id', authenticate(['jwt'], { session: false }), async (req, res, next) => {
  try {
    const store = await Store.findOne({ _id: req.params.id })
    if (!store) throw new ApiError(httpStatus.NOT_FOUND, 'Store not found')
    const { name, description, image } = req.body.store
    if (name) {
      store.name = name
    }
    if (description) {
      store.description = description
    }
    if (image) {
      store.image = image
    }
    await store.save()
    res.json(store)
  } catch (e) {
    next(e)
  }
})

router.delete('/:id', authenticate(['jwt'], { session: false }), async (req, res, next) => {
  try {
    const store = await Store.findOne({ _id: req.params.id })
    if (!store) throw new ApiError(httpStatus.NOT_FOUND, 'Store not found')
    await store.delete()
    res.status(httpStatus.NO_CONTENT).send()
  } catch (e) {
    next(e)
  }
})

export default router
