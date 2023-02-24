
const CadastroForma = require('../models/CadastroModel')

exports.index= async (req, res)=>{
 const contatos = await  CadastroForma.buscaFormas();
 return res.render('consultaFacas',{contatos});
}

exports.search= async function(req, res){
  const cadastroForma =new CadastroForma(req.body)
  const contatos = await  cadastroForma.searchForm(req.query.searchs);

  return res.render('searchResults',{contatos});
   }