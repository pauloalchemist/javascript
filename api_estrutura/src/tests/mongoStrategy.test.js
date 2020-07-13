const assert = require('assert');
const MongoDB = require('../db/strategies/mongodb/mongodb');
const HeroiSchema = require('../db/strategies/mongodb/schemas/heroisSchema');
const Context = require('../db/strategies/base/contextStrategy');

const MOCK_CADASTRAR = {
    nome: 'Mulher Maravilha',
    poder: 'laço'
};
const MOCK_DEFAULT = {
    nome: `Homem-Aranha-${Date.now}`,
    poder: 'teia'
};
const MOCK_ATUALIZAR = {
    nome: `Patolino${Date.now}`,
    poder: 'patise'
};
let MOCK_H_ID = '';

let context = {};

describe('MongoDB Suíte de testes', function()  {
    this.beforeAll(async () => { 
        const connection = MongoDB.connect(); 
        context = new Context(new MongoDB(connection, HeroiSchema));
        await context.create(MOCK_DEFAULT);
        const result = await context.create(MOCK_ATUALIZAR);
        MOCK_H_ID = result._id;
    });
    it('Verifcar conexão', async () => {
        const result = await context.isConnected();
        const expected = 'Conectado';
        assert.deepEqual(result, expected);
    });
    it('Cadastrar', async () => {
        const { nome, poder } = await context.create(MOCK_CADASTRAR);
        assert.deepEqual({nome, poder}, MOCK_CADASTRAR);
    });
    it('Listar', async () => {
        const [{nome, poder}] = await context.read({nome: MOCK_DEFAULT.nome});
        const result = { nome, poder};
        assert.deepEqual(result, MOCK_DEFAULT);     

    });

    it('Atualizar', async () => {
        const result = await context.update(MOCK_H_ID, {
            nome: 'Skoobdoo'
        });
        assert.deepEqual(result.nModified, 1);
    });
    it('Remover', async () => {
        const result = await context.delete(MOCK_H_ID);
        assert.deepEqual(result.n, 1);
    });
});