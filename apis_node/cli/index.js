const Commander = require('commander');
const Database = require('./database');
const Heroi = require('./heroi');
const database = require('./database');

async function main() {
    Commander
        .version('v1')
        .option('-n, --nome [value]', "Nome do Heroi")
        .option('-p, --poder [value]', "Poder do Heroi")
        .option('-i, --id [value]', "Id do Heroi")
        .option('-c, --cadastrar', "Cadastrar uum heroi")
        .option('-l, --listar', "Listar herois")
        .option('-r, --remover', "Remover heroi por id")
        .option('-a, --atualizar [value]', "Atualizar heroi por id")
        .parse(process.argv);
    
    const heroi = new Heroi(Commander);

    try {
        if(Commander.cadastrar) {
            delete heroi.id;
            const resultado = await Database.cadastrar(heroi);
            if(!resultado) {
                console.error('Heroi não foi cadasrado!');
                return;
            };
            console.log('Heroi cadastrado com sucesso!');
        };
        if(Commander.listar) {
            const resultado = await Database.listar();
            console.log(resultado);
            return;
        };
        if(Commander.remover) {
            const resultado = await Database.remover(heroi.id);
            if(!resultado){
                console.log('Não foi possível remover o heroi');
                return;
            };
            console.log('Heroi removido com suucesso');

        };
        if(Commander.atualizar) {
            const idAtualizar = parseInt(Commander.atualizar);
            //delete heroi.id
            const dado = JSON.stringify(heroi);
            const heroiAtualiar = JSON.parse(dado);
            const resultado = await Database.atualizar(idAtualizar, heroiAtualiar);
            if(!resultado) {
                console.error('Não foi possível atualizar o heroi');
                return;
            };
            console.log('Heroi atualizado com sucesso');

        };
    } catch (error) {
        console.error('Deu ruim', error);
    }
};

main();