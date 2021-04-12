const frutas = ['maçã', 'maçã', 'banana', 'laranja', 'uva', 'abacaxi', 'acerola']

const contagem = frutas.reduce((acc, fruta) => {
  if (acc[fruta]) {
    acc[fruta] = acc[fruta] + 1
  } else {
    acc[fruta] = 1
  }
  return acc
}, {})

console.log(contagem)
