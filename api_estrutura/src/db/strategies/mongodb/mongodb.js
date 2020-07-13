const ICrud = require('../base/interfaces/interfaceCrud');
const Mongoose = require('mongoose');
const STATUS = {
    0: 'Desconectando',
    1: 'Conectado',
    2: 'Conectando',
    3: 'Desconectado'
};

class MongoDB extends ICrud {
    constructor(connection, schema) {
        super();
        this._schema = schema;
        this._connection = connection;
    };
    async isConnected() {
        const state = STATUS[this._connection.readyState];
        if(state === 'Conectado') return state;
        if(state !== 'Conectando') return state;
        await new Promise(resolve => setTimeout(resolve, 1000));
        return STATUS[this._connection.readyState];

    };
    static connect() {
        Mongoose.connect('mongodb://paulodev:dev1478@localhost:27017/herois', {
            useNewUrlParser: true, useUnifiedTopology: true
        }, function (error) {
            if (!error) return;
            console.log('Falha de conexão no mongo', error);
        });
        
        const connection = Mongoose.connection;
        connection.once('open', () => console.log('mongodb/herois rodando!'));
        return connection;
    };
    create(item) {
        return this._schema
        .create(item);
    };
    read(item, skip=0, limit=10) {
        return this._schema
        .find(item).skip(skip).limit(limit);
    };
    update(id, item) {
        return this._schema
        .updateOne({_id: id}, {$set: item});
    };
    delete(id){
        return this._schema
        .deleteOne({_id: id});
    };
};

module.exports = MongoDB;