const { deepEqual, ok } = require('assert');
const database = require('./database');
const DEFAULT_ITEM = {
     nome: 'Flash',
     poder: 'speed',
     id: 1
};
const DEFAULT_ATUALIZAR = {
    nome: 'Homem-Aranha',
    poder: 'escalar paredes',
    id: 2
};

describe('Suite de manipulação de Herois', () => {
    before( async () => {
        await database.cadastrar(DEFAULT_ITEM);
        await database.cadastrar(DEFAULT_ATUALIZAR);
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
    it('Deve atualizar um heroi pelo id', async () => {
        const expected = {
            ...DEFAULT_ATUALIZAR,
            nome: 'Batman',
            poder: 'dinheiro'
        };
        const novoDado = {
            nome: 'Batman',
            poder: 'dinheiro'
        };
        await database.atualizar(DEFAULT_ATUALIZAR.id, novoDado);
        const [resultado] = await database.listar(DEFAULT_ATUALIZAR.id);
        deepEqual(resultado, expected);
    });
});
