const express = require('express');
const CategoriaController = require('./controllers/CategoriaController.js');
const CupomController = require('./controllers/CupomController.js');
const EstabelecimentoController = require('./controllers/EstabelecimentoController.js');
const ProdutoController = require('./controllers/ProdutoController.js');
const ServicoController = require('./controllers/ServicoController.js');

const routes = express.Router();

routes.post('/categorias', CategoriaController.store);
routes.get('/categorias', CategoriaController.index);
routes.get('/categorias/:id', CategoriaController.show);
routes.put('/categorias/:id', CategoriaController.update);
routes.delete('/categorias/:id', CategoriaController.delete);

routes.post('/cupons', CupomController.store);
routes.get('/cupons', CupomController.index);
routes.get('/cupons/:id', CupomController.show);
routes.put('/cupons/:id', CupomController.update);
routes.delete('/cupons/:id', CupomController.delete);

routes.post('/estabelecimentos', EstabelecimentoController.store);
routes.get('/estabelecimentos', EstabelecimentoController.index);
routes.get('/estabelecimentos/:id', EstabelecimentoController.show);
routes.put('/estabelecimentos/:id', EstabelecimentoController.update);
routes.delete('/estabelecimentos/:id', EstabelecimentoController.delete);

routes.post('/produtos', ProdutoController.store);
routes.get('/produtos', ProdutoController.index);
routes.get('/produtos/:id', ProdutoController.show);
routes.put('/produtos/:id', ProdutoController.update);
routes.delete('/produtos/:id', ProdutoController.delete);

routes.post('/servicos', ServicoController.store);
routes.get('/servicos', ServicoController.index);
routes.get('/servicos/:id', ServicoController.show);
routes.put('/servicos/:id', ServicoController.update);
routes.delete('/servicos/:id', ServicoController.delete);

module.exports = routes;