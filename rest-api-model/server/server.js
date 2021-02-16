const express = require('express')
const router = require('./route/postRoute')
const app = express()

app.use(express.json())
app.use(router)
app.disable('x-powered-by')

app.listen(3000)
