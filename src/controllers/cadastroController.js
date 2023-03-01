const CadastroModel = require("../models/CadastroModel");
const sucsses=require ("../middlewares/cadastroValidations")

exports.index = (req, res) => {
  res.render('cadastro', {
   errors:[]
  });
};


exports.register = async function (req, res){
  try {
    const formaCorteEVinco= new CadastroModel(req.body)
    await formaCorteEVinco.register();

  
     if(formaCorteEVinco.errors.length > 0 ){
      
      res.render('cadastro',formaCorteEVinco);
      return
     }
    
    res.render('index')
    return


  } catch (e) {
    console.log(e);
    return res.render(404)
  }

}


 




