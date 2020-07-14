const BaseRoute = require('./baseRoute');
const Joi = require('@hapi/joi');
const Boom = require('@hapi/boom');
const failAction = (request, headers, erro) => { throw erro; };

class HeroRoutes extends BaseRoute {
    constructor(db) {
        super();
        this.db = db;
    };
    list() {
        return {
            path: '/herois',
            method: 'GET',
            config: {
                tags: ['api'],
                description: 'Deve listar herois',
                notes: 'pode pagiinar resultador e filtrar por nome',
                validate: {
                    failAction,
                    query: {
                        skip: Joi.number().integer().default(0),
                        limit: Joi.number().integer().default(10),
                        nome: Joi.string().min(3).max(100)
                    }
                }
            },
            handler: (request, headers) => {
                  try {
                    const {skip, limit, nome} = request.query;
                    const query = nome ? {
                        nome: {$regex:`.*${nome}*.`}
                    } : {};
                    return this.db.read(nome ? query : {}, skip, limit);
                } catch (error) {
                    console.log('Deu ruim', error);
                    return Boom.internal();
                }
            }
        };
    
    };
    create() {
        return {
            path: '/herois',
            method: 'POST',
            config: {
                tags: ['api'],
                description: 'Deve cadastrar herois',
                notes: 'deve cadastrar heroi com nome e poder',
                validate: {
                    failAction,
                    payload: {
                        nome: Joi.string().required().min(3).max(100),
                        poder: Joi.string().required().min(2).max(100)
                    }
                }
            },
            handler: async (request) => {
                try {
                   const { nome, poder } = request.payload;
                   const result = await this.db.create({ nome, poder });
                   return {
                       message: "Heroi cadastrado com sucesso!",
                       _id: result._id
                   };
                } catch (error) {
                    console.log('Deu ruim', error);
                    return Boom.internal();
                }
            }
        };
    };
    update() {
        return { 
            path: '/herois/{id}',
            method: 'PATCH',
            config: {
                tags: ['api'],
                description: 'Deve atualizar heroi por id',
                notes: 'pode atualizar qualqquer campo',
                validate: {
                    params: {
                        id: Joi.string().required()
                    },
                    payload: {
                        nome: Joi.string().min(3).max(100),
                        poder: Joi.string().min(2).max(100)
                    } 
                }
            },
            handler: async (request) => {
                try {
                    const {id} = request.params;
                    const {payload} = request;
                    const dadosString = JSON.stringify(payload);
                    const dados = JSON.parse(dadosString);
                    const result = await this.db.update(id, dados);
                    if(result.nModified !== 1) return Boom.preconditionFailed('Id não encontrado no banco');

                    return {
                        message: 'Heroi atualizado com sucesso!'
                    } 
                } catch (error) {
                    console.error('Deu ruim', error);
                    return Boom.internal();
                }
            }
        };
    };
    delete() {
        return {
            path: '/herois/{id}',
            method: 'DELETE',
            config: {
                tags: ['api'],
                description: 'Deve deletar heroi por id',
                notes: 'o id tem que ser valido.',
                validate: {
                    failAction,
                    params: {
                        id: Joi.string().required()
                    }
                }
            },
            handler: async (request) => {
                try {
                    const {id} = request.params;
                    const result = await this.db.delete(id); 
                    if(result.n !== 1) 
                        return Boom.preconditionFailed('Id não encontrado no banco');

                    return {
                        message: 'Heroi removido com sucesso!'
                    };
                    
                } catch (error) {
                    console.error('Deu ruim', error);
                    return Boom.internal();
                }
            }
        };
    };    
};

module.exports = HeroRoutes;