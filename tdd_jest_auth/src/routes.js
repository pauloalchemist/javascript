const SessionController = require('./app/controllers/SessionController');
const authMiddleware = require('./app/middleware/auth');
const routes = require('express').Router();

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.get('/dashboard', (req, res) => {
  return res.status(200).send();
});


module.exports = routes;