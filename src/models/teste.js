const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://ricardos:cassius1@cluster0.d2eolpy.mongodb.net/teste?retryWrites=true&w=majority');

  const kittySchema = new mongoose.Schema({
    name: String
  });
  
  const Kitten = mongoose.model('Kitten', kittySchema);
  
  const silence = new Kitten({ name: 'Silence' });
  console.log(silence.name); // 'Silence'
  
  await silence.save();
}
