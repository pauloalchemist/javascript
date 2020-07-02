const { readFile } = require('fs')
const { promisify } = require('util')
const readFileAsync = promisify(readFile)
class Database {
    constructor(){
        this.NOME_ARQUIVO = 'herois.json'
    }
    async obterDados() {
        const arquivo = await readFileAsync(this.NOME_ARQUIVO, 'utf8')
        return JSON.parse(arquivo.toString())
    }
    escreveDados() {

    }
    async listar(id) {
        const dados =await this.obterDados()
        const dadosFiltrados = dados.filter(item => (id ? (item.id === id) : true))
        return dadosFiltrados        
    }
}


module.exports = new Database()
