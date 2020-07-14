const hapi = require('@hapi/hapi');
const Joi = require('@hapi/joi');
const Context = require('./db/strategies/base/contextStrategy');
const MongoDb = require('./db/strategies/mongodb/mongodb');  
const HeroiSchema = require('./db/strategies/mongodb/schemas/heroisSchema');
const HeroRoutes = require('./routes/heroRoutes');
const HapiSwagger = require('hapi-swagger');
const Vision = require('@hapi/vision');
const Inert = require('@hapi/inert');

const app = new hapi.Server({
    port: 5000
});

function mapRoutes(instance, methods) {
    return methods.map(method => instance[method]());
};

async function main() {
    const connection = MongoDb.connect(); 
    const context = new Context(new MongoDb(connection, HeroiSchema));
    const swaggerOptions = {
        info: {
            title: 'API Herois - Curso NodeBR',
            version: 'v1.0'
        },
      
    };
    await app.register([
        Vision,
        Inert,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);

    app.validator(Joi);
    app.route(
        mapRoutes(new HeroRoutes(context), HeroRoutes.methods())
    );

    await app.start();
    console.log('Servidor rodando na porta:', app.info.port);

    return app;
};

module.exports = main();