const express = require('express');
const CategoriaController = require('./controllers/CategoriaController.js');
const CupomController = require('./controllers/CupomController.js');
const EstabelecimentoController = require('./controllers/EstabelecimentoController.js');
const ProdutoController = require('./controllers/ProdutoController.js');
const ServicoController = require('./controllers/ServicoController.js');
const NoticiaController = require('./controllers/NoticiaController.js');

const routes = express.Router();

routes.post('/categorias', CategoriaController.store);
routes.get('/categorias', CategoriaController.index);
routes.get('/categorias/:id', CategoriaController.show);
routes.put('/categorias/:id', CategoriaController.update);
routes.delete('/categorias/:id', CategoriaController.delete);

routes.post('/cupons', CupomController.store);
routes.get('/cupons', CupomController.index);
routes.get('/cupons/:id', CupomController.show);
routes.get('/cupons/estabelecimento/:id', CupomController.showbyestab);
routes.put('/cupons/:id', CupomController.update);
routes.delete('/cupons/:id', CupomController.delete);

routes.post('/estabelecimentos', EstabelecimentoController.store);
routes.get('/estabelecimentos', EstabelecimentoController.index);
routes.get('/estabelecimentos/:id', EstabelecimentoController.show);
routes.get('/estabelecimentos/categoria/:id', EstabelecimentoController.showbycat);
routes.get('/estabelecimentos/busca/:nome', EstabelecimentoController.showbysearch);
routes.put('/estabelecimentos/:id', EstabelecimentoController.update);
routes.delete('/estabelecimentos/:id', EstabelecimentoController.delete);

routes.post('/noticias', NoticiaController.store);
routes.get('/noticias', NoticiaController.index);
routes.get('/noticias/:id', NoticiaController.show);
routes.put('/noticias/:id', NoticiaController.update);
routes.delete('/noticias/:id', NoticiaController.delete);

routes.post('/produtos', ProdutoController.store);
routes.get('/produtos', ProdutoController.index);
routes.get('/produtos/:id', ProdutoController.show);
routes.get('/produtos/estabelecimento/:id', ProdutoController.showbyestab);
routes.put('/produtos/:id', ProdutoController.update);
routes.delete('/produtos/:id', ProdutoController.delete);

routes.post('/servicos', ServicoController.store);
routes.get('/servicos', ServicoController.index);
routes.get('/servicos/:id', ServicoController.show);
routes.get('/servicos/estabelecimento/:id', ServicoController.showbyestab);
routes.put('/servicos/:id', ServicoController.update);
routes.delete('/servicos/:id', ServicoController.delete);

module.exports = routes;