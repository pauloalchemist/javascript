require('dotenv').config()
const pgp = require('pg-promise')()
const db = pgp({
  user: process.env.USERDB,
  password: process.env.PASS,
  host: process.env.DBHOST,
  port: process.env.DBPORT,
  database: process.env.DB
})

module.exports = db
