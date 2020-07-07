const { deepEqual, ok } = require('assert');
const database = require('./database');
const DEFAULT_ITEM = {
     nome: 'Flash',
     poder: 'speed',
     id: 1
};

describe('Suite de manipulação de Herois', () => {
    before( async () => {
        await database.cadastrar(DEFAULT_ITEM);
    });
    it('Deve pesquisar um heroi usando arquivos.', async () => {
        const expected = DEFAULT_ITEM;
        const [resultado] = await database.listar(expected.id);
        deepEqual(resultado, expected);
    });
    it('Deve cadastrar um heroi usando arquivos', async () => {
        const expected = DEFAULT_ITEM;
        const resultado = await database.cadastrar(DEFAULT_ITEM);
        const [actual] = await database.listar(DEFAULT_ITEM.id);
        deepEqual(actual, expected);
    });
    it('Deve remover o heroi por ID.', async () => {
        const expected = true;
        const resultado = await database.remover(DEFAULT_ITEM.id);
        deepEqual(resultado, expected);
    });
});
