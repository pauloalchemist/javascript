const { deepEqual, ok } = require('assert')
const database = require('./database')

const ITEM_CADASTRAR = { nome: 'Flash', poder: 'speed', id: 1 }

describe ('Suite de manipulação de Herois', () => {
    it('deve pesquisar um heroi usando arquivos', async () => {
        const expected = ITEM_CADASTRAR
        const [resultado] = await database.listar(expected.id)
        deepEqual(resultado, expected)
    })
    //it('deve cadastrar um heroi, usando aruivos', async () => {
     //   const expected = ITEM_CADASTRAR

     //   ok(null, expected)
    //})
})