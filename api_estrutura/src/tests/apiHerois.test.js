const assert = require('assert');
const api = require('../api');

let app = {};
const MOCK_CADASTRAR = {
    nome: 'Chapolin',
    poder: 'marreta'
};

describe.only('Suite de testes API Herois', function () {
    this.beforeAll(async () => {
        app = await api; 
    });
    it('Listar - rota /herois', async () => {
        const result = await app.inject({
            method: 'GET',
            url: '/herois?skip=0&limit=10'
        });
        const dados = JSON.parse(result.payload);
        const statusCode = result.statusCode;
        assert.deepEqual(statusCode, 200); 
        assert.ok(Array.isArray(dados));
    });
    it('Listar - deve retornar 10 registros de herois.', async () => {
        const sizeLimit = 3;
        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=${sizeLimit}`
        });
        const statusCode = result.statusCode;
        assert.deepEqual(statusCode, 200); 
    });
    it('Listar - deve retornar um erro com limit incorreto', async () => {
        const sizeLimit = 'AEEE';
        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=${sizeLimit}`
        });
        const errorResult = {
            "statusCode": 400,
            "error": "Bad Request",
            "message": "\"limit\" must be a number",
            "validation": {
                "source": "query",
                 "keys": ["limit"]
            }
        };
        assert.deepEqual(result.statusCode, 400);
        assert.deepEqual(result.payload, JSON.stringify(errorResult)); 
    });
    it('Listar - deve filtrar um item.', async () => {
        const NAME = 'Batman';
        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=1000&nome=${NAME}`
        });
        const dados = JSON.parse(result.payload);
        const statusCode = result.statusCode;
        assert.deepEqual(statusCode, 200); 
        assert.deepEqual(dados[0].nome, NAME);
    });
    it('Cadastrar herois (POST)', async() => {
        const result = await app.inject({
            method: 'POST',
            url: '/herois',
            payload: MOCK_CADASTRAR
        });
        const statusCode = result.statusCode;
        const { message, _id } = JSON.parse(result.payload);
        assert.ok(statusCode === 200);
        assert.notStrictEqual(_id, undefined);
        assert.deepEqual(message, 'Heroi cadastrado com sucesso!');
    });
    
});