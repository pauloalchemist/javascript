const hapi = require('@hapi/hapi');
const Joi = require('@hapi/joi');
const Context = require('./db/strategies/base/contextStrategy');
const MongoDb = require('./db/strategies/mongodb/mongodb');  
const HeroiSchema = require('./db/strategies/mongodb/schemas/heroisSchema');

const Postgres = require('./db/strategies/postgres/postgres');
const UsuarioSchema = require('./db/strategies/postgres/schemas/usuarioSchema');

const HeroRoutes = require('./routes/heroRoutes');
const authRoute = require('./routes/authRoute');

const HapiSwagger = require('hapi-swagger');
const Vision = require('@hapi/vision');
const Inert = require('@hapi/inert');

const HapiJwt = require('hapi-auth-jwt2');
const JWT_SECRET = 'MEU_SEGREDÃO_123';

const app = new hapi.Server({
    port: 5000
});

function mapRoutes(instance, methods) {
    return methods.map(method => instance[method]());
};

async function main() {
    const connection = MongoDb.connect(); 
    const context = new Context(new MongoDb(connection, HeroiSchema));

    const connectionPostgres = await Postgres.connect();
    const usuarioSchema = await Postgres.defineModel(connectionPostgres, UsuarioSchema);
    const contextPostgres = new Context(new Postgres(connectionPostgres, usuarioSchema));

    const swaggerOptions = {
        info: {
            title: 'API Herois - Curso NodeBR',
            version: 'v1.0'
        },
      
    };
    await app.register([
        HapiJwt,
        Vision,
        Inert,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);
    app.auth.strategy('jwt', 'jwt', {
        key: JWT_SECRET,
        //options: {
          //  expiresIn: 
        //},
        validate: async (dado, request) => {
            console.log('dado', dado);
            const [result] = await contextPostgres.read({
                username: dado.username.toLowerCase()
            });
            if(!result) {
                return {
                    isValid: false
                };
            };
            return {
                isValid: true
            };
        }
    });
    app.auth.default('jwt');

    app.validator(Joi);
    app.route([
        ...mapRoutes(new HeroRoutes(context), HeroRoutes.methods()),
        ...mapRoutes(new authRoute(JWT_SECRET, contextPostgres), authRoute.methods())
    ]);

    await app.start();
    console.log('Servidor rodando na porta:', app.info.port);

    return app;
};

module.exports = main();