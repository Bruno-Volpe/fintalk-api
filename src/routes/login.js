import { Router } from 'express'

import { signIn, signUp, sendEmail, checkCode, resetPassword } from '../controllers/Login'

const router = Router()

router.post('/', signIn)
router.post('/signup', signUp)
router.post('/forgot/send-email', sendEmail)
router.post('/forgot/check-code', checkCode)
router.put('/forgot/reset-password', resetPassword)

export default router 