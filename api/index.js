// Config
const express = require('express')
require('dotenv').config()

const app = express()
const cors = require('cors')
const router = require('./routes')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET')
  res.setHeader('Access-Control-Allow-Methods', 'POST')
  res.setHeader('Access-Control-Allow-Methods', 'PUT')
  res.setHeader('Access-Control-Allow-Methods', 'DELETE')

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true)

  // Pass to next layer of middleware
  next()
})

app.use(router)

app.listen(3001, () => {
  console.log('El servidor está corriendo en el puerto 3001')
})
