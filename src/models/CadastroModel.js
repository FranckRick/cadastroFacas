const mongoose = require('mongoose')


const CadastroSchema= new mongoose.Schema({
 idCadastro:{type:Number  ,required: true},
  cliente: { type: String, required: false, default: '' },
  codigo: { type: Number, required: false, default: '' },
  referencia: { type: String, required: false, default: '' },
  observacao: { type: String, required: false, default: '' },
  tipo_maquina:{ type: String, required: false, default: '' },
  criadoEm: { type: Date, default: Date.now },

});

const CadastroModel= mongoose.model('Cadastro',CadastroSchema);



function CadastroForma(body) {
  this.body = body;
  this.errors= [];
  this.formaCorteEVinco = null;
}

CadastroForma.prototype.register = async function() {
  this.valida();
  if(this.errors.length > 0) return;
 
  this.formaCorteEVinco = await CadastroModel.create(this.body);
};


  
CadastroForma.prototype.valida = function() {


  // Validação
  // O e-mail precisa ser válido
  if(!this.body.idCadastro ||typeof this.body.idCadastro===undefined ||this.body.idCadastro=== null) {
    this.errors.push({texto:' ID obrigatório'});
  }
    if(this.body.cliente.length <= 4) {
      this.errors.push({texto:'Nome do Cliente Muito pequeno'});
 
};
  }


module.exports = CadastroForma;