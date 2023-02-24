const express = require ('express');
const route= express.Router();
const homeController= require('./src/controllers/homeController');
const cadastroController= require('./src/controllers/cadastroController');
const consultaController= require('./src/controllers/consultaController');

const {loginRequired}= require('./src/middlewares/middleware')

//Rotas da Home-login
route.get('/',homeController.index)
route.post ('/',homeController.register);
route.post ('/login',homeController.login);
route.get ('/login/logout',homeController.logout);

//Rptas Cadastro
route.get('/cadastro/index',loginRequired,cadastroController.index)
route.post('/cadastro/register', loginRequired, cadastroController.register)
route.get('/cadastro/index/:id',loginRequired,cadastroController.editIndex)

route.post('/cadastro/edit/:id',loginRequired,cadastroController.edit)
route.get('/cadastro/delete/:id',loginRequired,cadastroController.delete)

route.get('/consultaFacas',consultaController.index)
route.get('/consultaFacas/:search',consultaController.search)

module.exports=route;
