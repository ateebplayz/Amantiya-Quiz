import { mongoClient } from "./modules/mongo";
import express from 'express'
import cors from 'cors'
import https from 'https'
import fs from 'fs'

import UserRoute from './routes/user'
import AdminRoute from './routes/admin'

const app = express()
app.use(cors())
app.use(express.json())

app.use('/users', UserRoute)
app.use('/admin', AdminRoute)
/*
const options = {
  key: fs.readFileSync('SSL/private.key'),
  cert: fs.readFileSync('SSL/certificate.crt')
}

const server = https.createServer(options, app)
*/
app.listen(8080, ()=>{
    console.log('App listening on Port 8080')
})

mongoClient.connect().then(()=>{
    console.log('Connected with mongodb')
}).catch(e=>{
    console.log('Error! ' + e)
})
