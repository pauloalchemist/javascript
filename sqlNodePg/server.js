const app = require('./src/api');

const port = process.env.PORT || 3333;

app.listen(port, () => {
	console.log('Aplicação executando na porta: ', port);
});
