import express from 'express'

import stores from './stores.route'
import auth from './auth.route'

const router = express.Router()

router.use('/stores', stores)
router.use(auth)

export default router
