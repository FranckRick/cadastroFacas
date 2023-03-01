const express= require('express');
const route = express.Router();
const cadastroController=require('./controllers/cadastroController');

route.get("/",function(req,res){res.render('index')})
route.get('/cadastro/index', cadastroController.index);


route.post('/cadastro/register',cadastroController.register)
module.exports=route
