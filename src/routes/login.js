import { Router } from 'express'

import { signIn, signUp, sendEmail } from '../controllers/Login'

const router = Router()

router.post('/', signIn)
router.post('/signup', signUp)
router.post('/send-email', sendEmail)


export default router 