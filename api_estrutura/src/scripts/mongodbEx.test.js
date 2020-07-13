const Mongoose = require('mongoose');
Mongoose.connect('mongodb://paulodev:dev1478@localhost:27017/herois', {
    useNewUrlParser: true, useUnifiedTopology: true }, function (error) {
        if(!error) return;
        console.log('Falha de conexão no mongo', error);
});
const connection = Mongoose.connection;
connection.once('open', () => console.log('mongodb/herois rodando!'));
/*setTimeout(() => {
    const state = connection.readyState;
    console.log('state', state);
}, 1000);*/
const heroiSchema = new Mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    poder: {
        type: String,
        required: true
    },
    insertedAt: {
        type: Date,
        default: new Date()
    }
});
const model = Mongoose.model('heroi', heroiSchema);
async function main() {
    const resultCadastrar = await model.create({

        nome: 'Batman',
        poder: 'inteligência'
    });
    console.log('result cadasrar', resultCadastrar); 

    const listItens = await model.find();
    console.log('Itens', listItens);
};

main();