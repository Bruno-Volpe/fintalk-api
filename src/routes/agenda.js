import { Router } from 'express'

import { remove, show, store } from '../controllers/Agenda'

const router = Router()

router.post('/', store)
router.get('/', show)
router.delete('/:id', remove)

export default router 