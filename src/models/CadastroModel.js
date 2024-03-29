const mongoose = require('mongoose')
const validator =require('validator')

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
   await this.formExists();
   if(this.errors.length > 0) return;
  this.formaCorteEVinco = await CadastroModel.create(this.body);
};

CadastroForma.prototype.formExists = async function() {
  const existingForm = await CadastroModel.findOne({
    tipo_maquina: this.body.tipo_maquina,
    idCadastro: this.body.idCadastro,
    referencia: this.body.referencia
  });

  if (existingForm) {
    this.errors.push('Forma já cadastrada.');
  }
};

CadastroForma.prototype.valida = function() {


  // Validação
  // O e-mail precisa ser válido
  if(!this.body.idCadastro ||typeof this.body.idCadastro===undefined ||this.body.idCadastro=== null) {
    this.errors.push(' ID obrigatório');
  }
    if(this.body.cliente.length < 4) {
      this.errors.push('Nome do Cliente Muito pequeno');
 
};
  }

  CadastroForma.prototype.cleanUp = function (){
    for(const key in this.body){
      if(typeof this.body[key] !== 'string'){
        this.body[key]='';
      }
    }
    this.body={
  idCadastro: this.body.idCadastro,
  cliente: this.body.cliente,
  codigo: this.body.codigo,
  referencia: this.body.referencia,
  observacao: this.body.observacao,
  tipo_maquina: this.body.tipo_maquina
  
    };
  }
  
  CadastroForma.prototype.edit = async function(id) {
    if (typeof id !== 'string') return;
    this.valida();
    if (this.errors.length > 0) return;
  
    const existingForm = await CadastroModel.findOne({
      tipo_maquina: this.body.tipo_maquina,
      idCadastro: this.body.idCadastro,
      _id: { $ne: id }
    });
  
    if (existingForm) {
      this.errors.push('Já existe uma forma com o mesmo ID de cadastro e tipo de máquina.');
      return;
    }
  
    this.formaCorteEVinco = await CadastroModel.findByIdAndUpdate(id, this.body, { new: true });
  };
  
  

  CadastroForma.prototype.searchForm = async function(search,tipo_maquina) {
   if(tipo_maquina==="all"){
    const contatos = await CadastroModel.find({$or:[{cliente:{$regex:`${search}`,$options:("i","x")}},{referencia:{$regex:`${search}`,$options:("x","i")}}]})
    .sort({criadoEm: -1});
    return contatos;

   }else{
    const contatos = await CadastroModel.find({tipo_maquina:{$regex:`${tipo_maquina}`,$options:"i"},$or:[{cliente:{$regex:`${search}`,$options:("i","x")}},{referencia:{$regex:`${search}`,$options:("x","i")}}]})
    .sort({criadoEm: -1});
    return contatos;
   }
   
  };

  //Metodos estáticos
  CadastroForma.buscaPorId = async function(id) {
    if(typeof id !== 'string') return;
    const contato = await CadastroModel.findById(id);
    return contato;
  };



  CadastroForma.buscaFormas = async function() {
 
    const contatos = await CadastroModel.find()
    .sort({criadoEm: -1});
    return contatos;
  };

  

  CadastroForma.delete = async function(id) {
    if(typeof id !== 'string') return;
    const contato = await CadastroModel.findOneAndDelete({_id:id})
  
    return contato;
  };





module.exports = CadastroForma;