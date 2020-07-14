const BaseRoute = require('./baseRoute');
const Joi = require('@hapi/joi');
const Boom = require('@hapi/boom');
const failAction = (request, headers, erro) => { throw erro; };
const JWT = require('jsonwebtoken');

const USER = {
    username: 'platão',
    password: '12345'
};

const headers = Joi.object({
    authoeization: Joi.string().required()
}).unknown();

class AuthRoute extends BaseRoute {
    constructor(secret) {
        super();
        this.secret = secret
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
                if (username.toLowerCase() !== USER.username || password !== USER.password)
                    return Boom.unauthorized();
                
                const token = JWT.sign({
                    username: username,
                    id:1
                }, this.secret);
                return {
                    token
                }; 
            }
        };
    };
};

module.exports = AuthRoute;