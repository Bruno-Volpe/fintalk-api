import { Router } from 'express'

import { store } from '../controllers/Customers'

const router = Router()

router.post('/store', store)

export default router 