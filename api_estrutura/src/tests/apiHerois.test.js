const assert = require('assert');
const api = require('../api');

let app = {};
const MOCK_CADASTRAR = {
    nome: 'Chapolin',
    poder: 'marreta'
};
const MOCK_INIT = {
    nome: 'HellBoy',
    poder:'mão de pedra'
};
let MOCK_ID = '';

describe('Suite de testes API Herois', function () {
    this.beforeAll(async () => {
        app = await api;
        const result = await app.inject({
            method: 'POST',
            url: '/herois',
            payload: MOCK_INIT
        });
        const dados = JSON.parse(result.payload);
        MOCK_ID = dados._id; 
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
        const NAME = MOCK_INIT.nome;
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
    it('Atualizar PATCH - /herois/:id', async () => {
        const _id = MOCK_ID;
        const expected = { poder: 'super força' };
        const result = await app.inject({
            method: 'PATCH',
            url: `/herois/${_id}`,
            payload: JSON.stringify(expected)
        });

        const statusCode = result.statusCode;
        const dados = JSON.parse(result.payload);
        assert.ok(statusCode === 200);
        assert.deepEqual(dados.message, 'Heroi atualizado com sucesso!');
    });
    it('Atualizar PATCH - não atualizar com ID incorreto', async () => {
        const _id = `5f0897f3c1ab3c20263110f9`; //id alterado para teste
        const result = await app.inject({
            method: 'PATCH',
            url: `/herois/${_id}`,
            payload: JSON.stringify({ poder: 'super força' })
        });

        const statusCode = result.statusCode;
        const dados = JSON.parse(result.payload);
        const expected = {
            statusCode: 412,
            error: 'Precondition Failed',
            message: 'Id não encontrado no banco'
        };
          
        assert.ok(statusCode === 412);
        assert.deepEqual(dados, expected);
    });
    it('Deve remover (DELETE) um item pelo ID', async () => {
        const _id = MOCK_ID;
        const result = await app.inject({
            method: 'DELETE',
            url: `/herois/${_id}`,
        });
        const statusCode = result.statusCode;
        const dados = JSON.parse(result.payload);

        assert.ok(statusCode === 200);
        assert.deepEqual(dados.message, 'Heroi removido com sucesso!');
    }); 
    it('Não deve remover (DELETE) um item pelo ID incorreto', async () => {
        const _id = '5f0897f3c1ab3c20263110f9';
        const result = await app.inject({
            method: 'DELETE',
            url: `/herois/${_id}`,
        });
        const statusCode = result.statusCode;
        const dados = JSON.parse(result.payload);
        const expected = {
            statusCode: 412,
            error: 'Precondition Failed',
            message: 'Id não encontrado no banco'
        };
        assert.ok(statusCode === 412);
        assert.deepEqual(dados, expected);
    });
    it('Não deve remover (DELETE) com ID invaalido', async () => {
        const _id = 'ID_Invalido';
        const result = await app.inject({
            method: 'DELETE',
            url: `/herois/${_id}`,
        });
        const statusCode = result.statusCode;
        const dados = JSON.parse(result.payload);
        const expected = {
            statusCode: 500,
            error: 'Internal Server Error',
            message: 'An internal server error occurred'
        };
        assert.ok(statusCode === 500);
        assert.deepEqual(dados, expected);
    });
    
});