import logger from '@/config/logger'
import glob from 'glob'
import express from 'express'

import stores from './stores.route'

const router = express.Router()

router.use('/stores', stores)

export default router
