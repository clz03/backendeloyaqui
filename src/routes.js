const express = require('express');
const CategoriaController = require('./controllers/CategoriaController.js');
const EstabelecimentoController = require('./controllers/EstabelecimentoController.js');

const routes = express.Router();

routes.post('/categorias', CategoriaController.store);
routes.get('/categorias', CategoriaController.index);

routes.post('/estabelecimentos', EstabelecimentoController.store);
routes.get('/estabelecimentos', EstabelecimentoController.index);

module.exports = routes;