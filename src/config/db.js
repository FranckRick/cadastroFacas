

const mongoose=require('mongoose')
const conn =async ()=>{
  try{
      const dbConn= await mongoose.connect(`mongodb+srv://ricardos:cassius1@cluster0.d2eolpy.mongodb.net/teste?retryWrites=true&w=majority`,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          
        })
        console.log('Conection Data Base')
       
        return dbConn
  }catch (error){
    console.log(error)
  }
}


conn()
module.exports=conn