const assert = require('assert');
const PasswordHelper = require('../helpers/passwordHelper');

const SENHA = 'Paulo@4848484';
const HASH = '$2b$04$JMd9E2.fwqW2ErK1wKT1jeSN9Z0pLLnZpeaoyoZMqi6IiIhyg6RYu';

describe('UserHelper test suite', function () {
    it('deve gerar um hash a partir de uma senha', async () => {
        const result = await PasswordHelper.hashPassword(SENHA);
        assert.ok(result.length > 10);
    });
    it('deve validar a senha com seu hash', async () => {
        const result = await PasswordHelper.comparePassword(SENHA, HASH);
        assert.ok(result)
    });
});