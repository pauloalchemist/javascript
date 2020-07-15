const BaseRoute = require('./baseRoute');
const Joi = require('@hapi/joi');
const Boom = require('@hapi/boom');
const failAction = (request, headers, erro) => { throw erro; };
const JWT = require('jsonwebtoken');
const PasseordHelper = require('../helpers/passwordHelper');

/*const USER = {
    username: 'platão',
    password: '123'
};*/

class AuthRoute extends BaseRoute {
    constructor(secret, db) {
        super();
        this.secret = secret,
        this.db = db
    };

    login() {
        return {
            path: '/login',
            method: 'POST',
            config: {
                auth: false,
                tags: ['api'],
                description: 'Obter token',
                notes: 'Faz login com user e senha do banco',
                validate: {
                    failAction,
                    payload: {
                        username: Joi.string().required(),
                        password: Joi.string().required()
                    }
                }
            },
            handler: async (request) => {
                const { username, password } = request.payload;
                const [usuario] = await this.db.read({
                    username: username.toLowerCase()
                });
                if(!usuario) {
                    return Boom.unauthorized('Usuário informado não eiste.'); 
                };
                const math = await PasseordHelper.comparePassword(password, usuario.password);
                if(!math) {
                    return Boom.unauthorized('Usuário ou senha invalidos.');
                };
               // if (username.toLowerCase() !== USER.username || password !== USER.password)
                    //return Boom.unauthorized();
                
                const token = JWT.sign({
                    username: username,
                    id:usuario.id
                }, this.secret);
                return {
                    token
                }; 
            }
        };
    };
};

module.exports = AuthRoute;