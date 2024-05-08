import express from 'express'
import dotenv from 'dotenv'
import { adminCollection } from '../modules/mongo'
import jwt from 'jsonwebtoken'
dotenv.config()

const secretCode = process.env.CODE

const router = express.Router()

router.get('/authenticate', async (req, res) => {
    const username = req.query.username
    const password = req.query.password
    const code = req.query.code

    if(!username || username == '') return res.json({data: 'Invalid Username'})
    if(!password || password == '') return res.json({data: 'Invalid Password'})
    if(!code || code == '' || code.length !== 8) return res.json({data: 'Invalid 8 Digit Code'})

    const doc = await adminCollection.findOne({username: username, password: password})
    if(doc) {
        if(code == secretCode) {
            const token = jwt.sign(doc, process.env.JWTKEY as string)
            return res.json({data: token, code: 200})
        } else return res.json({data: 'Incorrect 8 digit passcode entered.', code: 401})
    } else return res.json({data: 'Incorrect username or password', code: 401})
})

export default router