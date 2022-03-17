//CONFIGURAÇÕES DO BANCO

const mongoose = require("mongoose");

//Conectar no banco
mongoose.connect("mongodb+srv://admin:admin@cluster0.cnisw.mongodb.net/ph?retryWrites=true&w=majority")


//Corrigir bugs do banco
mongoose.Promise=global.Promise;
module.exports=mongoose;