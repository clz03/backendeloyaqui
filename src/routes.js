const express = require('express');
const CategoriaController = require('./controllers/CategoriaController.js');
const CupomController = require('./controllers/CupomController.js');
const EstabelecimentoController = require('./controllers/EstabelecimentoController.js');
const ProdutoController = require('./controllers/ProdutoController.js');
const ServicoController = require('./controllers/ServicoController.js');
const NoticiaController = require('./controllers/NoticiaController.js');
const UsuarioController = require('./controllers/UsuarioController.js');
const AdministradorController = require('./controllers/AdministradorController.js');
const EventoController = require('./controllers/EventoController.js');
const UserCupomController = require('./controllers/UserCupomController.js');
const PrecadastroController = require('./controllers/PrecadastroController.js');
const HomeAlertController = require('./controllers/HomeAlertController.js');
const TelUtilController = require('./controllers/TelUtilController.js');
const CardapioController = require('./controllers/CardapioController.js');

const routes = express.Router();

routes.post('/categorias', CategoriaController.store);
routes.get('/categorias', CategoriaController.index);
routes.get('/categorias/:id', CategoriaController.show);
routes.put('/categorias/:id', CategoriaController.update);
routes.delete('/categorias/:id', CategoriaController.delete);

routes.post('/cupons', CupomController.store);
routes.get('/cupons', CupomController.index);
routes.get('/cupons/Todos', CupomController.showAll);
routes.get('/cupons/:id', CupomController.show);
routes.get('/cupons/estabelecimento/:id', CupomController.showbyestab);
routes.put('/cupons/:id', CupomController.update);
routes.delete('/cupons/:id', CupomController.delete);

routes.post('/estabelecimentos', EstabelecimentoController.store);
routes.get('/estabelecimentos', EstabelecimentoController.index);
routes.get('/estabelecimentos/Todos', EstabelecimentoController.showAll);
routes.get('/estabelecimentos/:id', EstabelecimentoController.show);
routes.get('/estabelecimentos/categoria/:id', EstabelecimentoController.showbycat);
routes.get('/estabelecimentos/busca/:nome', EstabelecimentoController.showbysearch);
routes.get('/estabelecimentos/com/agendamento/habilitado', EstabelecimentoController.showbyagenda);
routes.get('/estabelecimentos/com/delivery', EstabelecimentoController.showbydelivery);
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

routes.post('/usuarios', UsuarioController.store);
routes.get('/usuarios', UsuarioController.index);
routes.get('/usuarios/:id', UsuarioController.show);
routes.get('/usuarios/email/:email', UsuarioController.showbyEmail);
routes.post('/authenticate', UsuarioController.authenticate);
routes.post('/forgotpwd', UsuarioController.forgotpwd);
routes.post('/validacadastro', UsuarioController.validacadastro);
routes.put('/usuarios/:id', UsuarioController.update);
routes.delete('/usuarios/:id', UsuarioController.delete);

routes.post('/administradores', AdministradorController.store);
routes.get('/administradores', AdministradorController.index);
routes.get('/administradores/:id', AdministradorController.show);
routes.post('/admauthenticate/', AdministradorController.authenticate);
routes.post('/admforgotpwd', AdministradorController.forgotpwd);
routes.put('/administradores/:id', AdministradorController.update);
routes.delete('/administradores/:id', AdministradorController.delete);

routes.post('/eventos', EventoController.store);
routes.get('/eventos', EventoController.index);
routes.get('/eventos/:id', EventoController.show);
routes.get('/eventos/estabelecimento/:estab/:mes', EventoController.showbyestab);
routes.get('/eventos/usuario/:idusuario', EventoController.showbyuser);
routes.get('/eventos/dia/:data/:estab', EventoController.showbyday);
routes.put('/eventos/:id', EventoController.update);
routes.delete('/eventos/:id', EventoController.delete);

routes.post('/usercupons', UserCupomController.store);
routes.get('/usercupons', UserCupomController.index);
routes.get('/usercupons/:id', UserCupomController.show);
routes.get('/usercupons/usuario/:id', UserCupomController.showbyuser);
routes.put('/usercupons/:id', UserCupomController.update);
routes.delete('/usercupons/:id', UserCupomController.delete);

routes.post('/precadastro', PrecadastroController.store);
routes.get('/precadastro', PrecadastroController.index);
routes.get('/precadastro/:id', PrecadastroController.show);
routes.put('/precadastro/:id', PrecadastroController.update);
routes.delete('/precadastro/:id', PrecadastroController.delete);

routes.post('/homealert', HomeAlertController.store);
routes.get('/homealert', HomeAlertController.index);
routes.get('/homealert/:id', HomeAlertController.show);
routes.put('/homealert/:id', HomeAlertController.update);
routes.delete('/homealert/:id', HomeAlertController.delete);

routes.post('/teluteis', TelUtilController.store);
routes.get('/teluteis', TelUtilController.index);
routes.get('/teluteis/:id', TelUtilController.show);
routes.put('/teluteis/:id', TelUtilController.update);
routes.delete('/teluteis/:id', TelUtilController.delete);

routes.post('/cardapios', CardapioController.store);
routes.get('/cardapios', CardapioController.index);
routes.get('/cardapios/:id', CardapioController.show);
routes.get('/cardapios/estabelecimento/:idestabelecimento', CardapioController.showbyestab);
routes.put('/cardapios/:id', CardapioController.update);
routes.delete('/cardapios/:id', CardapioController.delete);

module.exports = routes;