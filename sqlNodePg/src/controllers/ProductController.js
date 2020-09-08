const db = require('../config/database');

exports.create = async (req, res) => {
	const { productname, quantity, price } = req.body;
	await db.query(
		'INSERT INTO products(productname, quantity, price) VALUES ($1, $2, $3)',
		[productname, quantity, price]
	);

	res.status(201).send({
		message: 'Product added suceessfully',
		body: {
			product: { productname, quantity, price },
		},
	});
};

exports.listAll = async (req, res) => {
	const response = await db.query(
		'SELECT * FROM products ORDER BY productname ASC'
	);
	res.status(200).send(response.rows);
};

exports.findProductById = async (req, res) => {
	const productId = parseInt(req.params.id);
	const response = await db.query(
		'SELECT * FROM products WHERE productid = $1',
		[productId]
	);
	res.status(200).send(response.rows);
};

exports.updateProduct = async (req, res) => {
	const productId = parseInt(req.params.id);
	const { productname, quantity, price } = req.body;

	const response = await db.query(
		'UPDATE products SET productname = $1, quantity = $2, price  = $3 WHERE productid = $4',
		[productname, quantity, price, productId]
	);

	res.status(200).send({ message: 'Product Updated Successfully.' });
};

exports.deleteProductById = async (req, res) => {
	const productId = parseInt(req.params.id);
	await db.query('DELETE FROM products WHERE productid = $1', [productId]);

	res.status(200).send({ message: 'Product deleted successfully.' });
};
