import express from 'express'
const app = express()

app.get('/', (req, res) => {
  res.json({message: "tá rodando!"})
})

app.listen(3333, () => {
  console.log('Server ativo na porta 3333')
})
