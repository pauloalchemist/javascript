const routes = require('express').Router();
const ProductController = require('./controllers/ProductController');

routes.get('/product', ProductController.listAll);
routes.get('/product/:id', ProductController.findProductById);
routes.post('/product', ProductController.create);
routes.put('/product/:id', ProductController.updateProduct);
routes.delete('/product/:id', ProductController.deleteProductById);

module.exports = routes;
