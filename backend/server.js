const express = require('express')
const cors = require('cors')
const router = require('./router/routes')
const Db = require('./model/connect')
const fs = require('fs')

const app = express()
require('dotenv').config()
const port = process.env.PORT;

Db() //Connected to MongoDb
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(router)
app.use('/uploads', express.static('uploads'));



app.listen(port,() => {
    console.log(`Backend Server Starts at http://localhost:${port}`);
})