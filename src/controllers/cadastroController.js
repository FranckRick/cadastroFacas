const CadastroForma = require('../models/CadastroModel')

exports.index=(req, res)=>{
   res.render('cadastro',{
      contato:{}
   })
};

exports.register= async (req, res)=>{
try {
   const cadastroForma =new CadastroForma(req.body);
   await cadastroForma.register();
  if(cadastroForma.errors.length>0){
   req.flash('errors',cadastroForma.errors)
   req.session.save(()=>res.redirect('/cadastro/index'));
   return;
  }
  req.flash('success',"forma Registrada com Sucesso")
   req.session.save(()=>res.redirect(`/cadastro/index/`));
   return;
} catch (e) {
   console.log(e);
   res.render('404')
}
 
 
};

exports.editIndex = async function(req, res) {
   if(!req.params.id) return res.render('404');
 
   const contato = await CadastroForma.buscaPorId(req.params.id);
   if(!contato) return res.render('404');
 
   res.render(`cadastro`, { contato });
 };

 exports.edit= async function(req, res){
try {
   if(!req.params.id) return res.render('404');
   const cadastroForma = new CadastroForma(req.body);
   await cadastroForma.edit(req.params.id);

   if(cadastroForma.errors.length>0){
      req.flash('errors',cadastroForma.errors)
      req.session.save(()=>res.redirect('back'));
      return;
     }
     req.flash('success',"forma Editada com Sucesso")
      req.session.save(()=>res.redirect(`/cadastro/index/${cadastroForma.formaCorteEVinco._id}`));
      return;
} catch (e) {
  console.log(e);
  res.render('404');
}

 }



 exports.delete = async function(req, res) {
   if(!req.params.id) return res.render('404');
 
   const contato = await CadastroForma.delete(req.params.id);
   if(!contato) return res.render('404');
   req.flash('success',"forma Apagada com Sucesso")
   req.session.save(()=>res.redirect(`/consultaFacas`));
   return;
 };
