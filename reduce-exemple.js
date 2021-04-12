const frutas = ['maçã', 'maçã', 'banana', 'laranja', 'uva', 'abacaxi', 'acerola']

const contagem = frutas.reduce((acc, fruta) => {
  const frutaCount = acc[fruta]
  frutaCount
    ? acc[fruta] = frutaCount + 1 
    : acc[fruta] = 1 
  return acc
}, {})

console.log(contagem)
