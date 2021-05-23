import logger from '@/config/logger'
import { Store } from '@/models/store.model'
import ApiError from '@/utils/ApiError'
import express from 'express'
import httpStatus from 'http-status'

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const store = await Store.find()
    res.json(store)
  } catch (e) {
    next(e)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const store = await Store.findOne({ _id: req.params.id })
    res.json(store)
  } catch (e) {
    next(e)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const store = new Store(req.body.store)
    await store.save()
    res.json(store)
  } catch (e) {
    next(e)
  }
})

router.patch('/:id', async (req, res, next) => {
  try {
    const { name, description, image } = req.body
    const store = await Store.findOne({ _id: req.params.id })
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

router.delete('/:id', async (req, res, next) => {
  try {
    const result = await Store.findOneAndDelete({ _id: req.params.id })
    res.json(result)
  } catch (e) {
    next(e)
  }
})

export default router