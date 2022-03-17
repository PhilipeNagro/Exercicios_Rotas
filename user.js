//Importando mongoDb
const mongoose = require("./mongo");

//Criando um Schema
const Schema =mongoose.Schema;

//Passando as variaveis do schema, ou seja criando o Objeto
const user = new Schema({
    //todos os campus do esquema
    //_id:{type:String},
    name:{type:String,required:true},
    age:Number,
    email:{type:String,required:true},
    password:{type:String,required:true}
    //tem outras variaveis criadas automaticas
    //add, update_add, version
});

//Criando o modelo do schema para ser usado no banco
module.exports = mongoose.model("User",user);