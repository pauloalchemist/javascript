let stringOne = 'Estes são alguns exemplos de métodos com strings em JavaScript.'
let stringTwo = 'JavaScript é uma linguagem legal que evolui a cada dia.'

// chartAt() localiza caracter conforme indice infromado 
console.log(`O caracter com indíce 4 é o ${stringOne.charAt(4)}.`)
// concat() concatena strings e pode inserir novos elementos.
console.log(stringOne.concat(stringTwo))
console.log(stringOne.concat(' ', stringTwo))
// ensWidth() retorna true ou false ao verificar como termina uma string de acordo com o caracter passado.
console.log(stringOne.endsWith('.'))
console.log(stringTwo.endsWith('dia.'))

const regex = /[^A-Z]/g
console.log(stringOne.match(regex))

console.log(stringOne.toLowerCase())

const email = 'paulolinsdev@gmail.com'
const isEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
const result = isEmail.test(email)
console.log('E o email é: ', result)
