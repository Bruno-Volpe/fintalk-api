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
    const emailForms = req.body.email || null
    if (!emailForms) return res.status(404).send(errorM('Email not sent'))

    // Check if user exists
    const user = await Users.findOne({ where: { email: emailForms } })
    if (!user) {
        return res.status(404).send(errorM('User not found'))
    }

    const code = Math.floor(Math.random() * 99999999)
    const remetente = await nodemailer.createTransport({
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

    const email = {
        from: 'login.escola@outlook.com',
        to: emailForms,
        subject: 'Your Code',
        text: `Your code is ${code}`,
    }

    await remetente.sendMail(email, function (error) {
        if (error) {
            console.log(error)
        }
    })

    const token = jwt.sign({ emailForms, code }, 'FHddvve    svcssss   fows11w1 1288#$%c', { expiresIn: '1h' }) //TODO: substituir por dotenv e o tempo de espera
    res.status(200).json(['Email sent successfully!', token])
}


export {
    signIn,
    signUp,
    sendEmail,
}