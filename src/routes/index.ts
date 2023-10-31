import express from 'express'
import { IS_PRODUCTION } from '@/config/config'

import stores from './stores.route'
import auth from './auth.route'

import swaggerUi from 'swagger-ui-express'

// auto-gen, or use "yarn swagger"
import swaggerOutput from '../swagger_output.json'

const router = express.Router()

router.use('/stores', stores)
router.use(auth)

if (!IS_PRODUCTION) {
  router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput))
}

export default router
