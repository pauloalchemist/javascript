const log = require('debug')('api:main')
const app = require('express')()
const { sum } = require('./math')

app.use((request, response, next) => {
  log(request.query, `request at: ${new Date().toISOString()}`)
  return next()
})

app.get('/', (request, response) => {
  const num1 = Math.floor(Math.random() * 100)
  const num2 = Math.floor(Math.random() * 100)
  const result = sum(num1, num2)
  return response.send(`${num1} + ${num2} is: ${result}`)
})

app.listen(3000, () => {
  log('rodando na porta 3000')
})

