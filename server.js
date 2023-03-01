require('dotenv').config()

const express= require('express')

const path = require('path')

const routes = require('./src/routes')

require('./src/config/db')


//Criar app

const app= express() //inicia o express

//configurar o ejs 

app.set('view engine','ejs')

app.use(express.static("public"))// contudo estatico

app.set('views', path.join(__dirname, 'src','views'))


app.use(express.urlencoded({ extended: true }))//trata os dados enviadas como post



app.use(routes)


  app.listen(3000,()=>  console.log('Acessar http://localhost:3000'))//funcao existentent dentro do express



