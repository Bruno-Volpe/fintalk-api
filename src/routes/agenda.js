import { Router } from 'express'

import { remove, show, store, getByDate } from '../controllers/Agenda'

const router = Router()

router.post('/', store)
router.get('/', show)
router.delete('/:id', remove)
router.post('/getByDate', getByDate)

export default router 