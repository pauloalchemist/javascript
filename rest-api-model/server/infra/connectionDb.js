const pgp = require('pg-promise')()
const db = pgp({
  user: 'postgres',
  password: '',
  host: 'localhost',
  port: 5432,
  database: 'javascript'
})

module.exports = db
