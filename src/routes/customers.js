import { Router } from 'express'

import { store, show, remove, update } from '../controllers/Customers'

const router = Router()

router.post('/store', store)
router.get('/:id', show)
router.delete('/:id', remove)
router.put('/:id', update)

export default router 