import errorM from '../utils/errorM'
import Users from '../models/Users'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import nodemailer from 'nodemailer'

const signIn = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json(errorM('User or password not informed'))
    }
    await Users.findOne({ where: { email } })
        .then(user => {
            if (!user) {
                return res.status(401).json(errorM('User or password incorrect'))
            }
            // Verify password using bcrypt
            bcrypt.compare(password, user.password_hash, (err, result) => {
                if (err) {
                    return res.status(500).json(errorM(err))
                }
                if (!result) {
                    return res.status(401).json(errorM('User or password incorrect'))
                }
                const { id, email } = user
                const token = jwt.sign({ id, email }, 'process.env.SECRET', {
                    expiresIn: '1d'
                })
                return res.json({ token })
            })
        })
        .catch(err => {
            return res.status(500).json(errorM(err))
        })
}

const signUp = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json(errorM('User or password not informed'))
    } else if (password.length < 6) {
        return res.status(400).json(errorM('Password must be at least 6 characters'))
    }

    await Users.findOne({ where: { email } })
        .then(user => {
            if (user) {
                return res.status(400).json(errorM('User already exists'))
            }
            // Create password using bcrypt
            bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json(errorM(err))
                }
                Users.create({ email, password_hash: hash })
                    .then(user => {
                        return res.json(user)
                    })
                    .catch(err => {
                        return res.status(400).json(errorM(err.errors.map(error => error.message)))
                    })
            })
        })
        .catch(err => {
            return res.status(500).json(errorM(err))
        })
}

const sendEmail = async (req, res) => {
    const { email } = req.body
    if (!email) {
        return res.status(400).json(errorM('Email not informed'))
    }
    await Users.findOne({ where: { email } })
        .then(async user => {
            // Usuario não existe
            if (!user) {
                return res.status(404).json(errorM('User not found'))
            }

            // Usuario existe
            // Enviar email, com codigo
            const code = Math.floor(Math.random() * 99999999)
            const remetente = nodemailer.createTestAccount({
                host: "smtp.office365.com", // hostname
                secureConnection: false, // TLS requires secureConnection to be false
                port: 587, // port for secure SMTP
                tls: {
                    ciphers: 'SSLv3'
                },
                auth: {
                    user: 'login.escola@outlook.com',
                    pass: 'Bv759236'
                }
            })

            const emailOrigin = {
                from: 'login.escola@outlook.com',
                to: email,
                subject: 'Your Code',
                text: `Your code is ${code}`,
            }

            await remetente.sendEmail(emailOrigin, function (error) {
                console.log('#############')
                if (error) {
                    console.log(error)
                    return res.status(400).json(errorM('Error sending email'))
                }
            })

            const token = jwt.sign({ email, code }, 'TokenEmail', { expiresIn: '1h' }) //TODO: substituir por dotenv e o tempo de espera
            res.status(200).json(token)
        })
        .catch(err => {
            return res.status(400).json(errorM('Error sending email or user not found'))
        })
}

export {
    signIn,
    signUp,
    sendEmail,
}