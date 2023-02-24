const Login = require('../models/HomeModel')


/*const HomeModel=require('../models/HomeModel')

HomeModel.create({
  titulo:"um Titulo de Testes",
  descricao:'uma Descricao de testes'
})
.then(dados=>console.log(dados))
.catch(e=>console.log(e)); 
*/
exports.index=(req, res)=>{
  if(req.session.user) return res.render('index-logado')
 return res.render('index')
}

exports.register = async (req, res) => {
try{
  const login= new Login(req.body);
  await login.register();
  if(login.errors.length > 0) {
    req.flash('errors', login.errors);
    req.session.save(function() {
      return res.redirect('back');
    });
return
  }
  req.flash('success', 'Seu usuário foi criado com sucesso.');
  req.session.save(function() {
    return res.redirect('back');
  });
}catch (e){
  console.log(e)
 return res.render('404')
}
};

exports.login = async (req, res) => {
  try{
    const login= new Login(req.body);
    await login.login();
    if(login.errors.length > 0) {
      req.flash('errors', login.errors);
      req.session.save(function() {
        return res.redirect('back');
      });
  return
    }
    
    req.flash('success', 'Voçê entrou no sistema!');
    req.session.user= login.user;
    req.session.save(function() {
      return res.redirect('back');
    });
  }catch (e){
    console.log(e)
   return res.render('404')
  }
  };

  exports.logout= function(req,res){
    req.session.destroy();
    res.redirect('/')
  }
