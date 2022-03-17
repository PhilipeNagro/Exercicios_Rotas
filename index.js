const express = require("express"); //JS
const req = require("express/lib/request");
const { json } = require("express/lib/response");
const res = require("express/lib/response");
// import express from "express"; //TS


///CRUD DO JUBILAO 




const user = require("./user");

//instanciar express
const app = express();

//criando um banco falso
const banco = {
  nome: "",
  senha: "123",
  saldo: 0,
};

//fazer o express usar .json
app.use(express.json());

//eviar info pra tela
app.get("/", (request, response) => {
  return response.json(banco);
});

//usuario enviar nome
// app.get("/:nome",(req,res)=>{   //:nome é o q vamos receber
//     const nome = req.params.nome; //uma variavel q faz a requisição de uma variavel
//     banco.nome = nome;
//     return res.send(banco.nome);
// })

//para enviar um dado mais complexo
/*
app.post("/",(req,res)=>{
    const senha = req.body.senha;
    const validacao = senha === banco.senha
    return res.send(validacao);
})
*/

//USANDO PATCH()
app.patch("/", (req, res) => {
  // const saldo = req.saldo; ///mesma coisa da de baixo
  const { saldo, senha } = req.body;
  if (senha === banco.senha) {
    // banco.saldo = saldo +banco.saldo;
    banco.saldo += saldo;
    return res.json({ msg: `Saldo att com sucesso, Novo: ${banco.saldo}` });
  } else {
    return res
      .status(401) // Numero statu do erro ( no caso, "nao autorizada")
      .json({ msg: `Senha incorreta, impossivel att!` });
  }
});

app.delete("/:nome", (req, res) => {
  const { nome } = req.params;
  if (nome === banco.nome) {
    banco.nome = "";
    return res.json({ msg: "Nome apagado com sucesso" });
  } else return res.status(404).json({ msg: "Nome nao encontrado" });
});

//==================================================================

//USANDO O BANCO
//BANCOO    //async = assincrono=== avisar q vai demorar
app.post("/", async (req, res) => {
  const { name, age, email, password } = req.body;
  if (!name) {
    return res.status(500).json({
      msg: "Digite o nome",
    });
  }
  try {
    const newUser = await user.create({
      //NewUser é só pra pegar o _id
      //Passando o objeto pro banco
      name,
      age,
      email,
      password,
    }); //chamando o banco
    return res.json({ msg: "Usuario criado com sucesso", newUser });
  } catch (e) {
    return res.status(500).json({ msg: `ocorreu um erro estranho ${e}` });
  }
});

//Lista usuarios do banco
app.get("/findAll", async (req, res) => {
  //Try catch // tratando erro pra repassar pro front
  try {
    const listUsers = await user.find();
    // throw new Error("erro estranh");
    return res.json({ list: listUsers });
  } catch (e) {
    return res.status(500).json({ msg: `ocorreu um erro estranho ${e}` });
  }
});

app.get("/find", async(req,res)=>{
    try{
        const {nameUser}=req.query;
        const userFind= await user.findOne({name:nameUser})
        return res.json({userFind});
    }catch(e){
        return res.status(500).json({ msg: `ocorreu um erro estranho ${e}` });
    }
});

app.patch("/updateAge", async (req, res) => {
  try {
    const { age, _id } = req.body;

    const updateUser = await user.findOneAndUpdate(
      { _id },
      { age },
      { new: true } //mostra a idade nova no insonima 
    );
    return res.json({ msg: `Usuario atualizado com sucesso`, updateUser });
  } catch (e) {
    return res.status(500).json({ msg: `ocorreu um erro estranho ${e}` });
  }
});

app.put("/update/:id",async(req,res)=>{
    try{
        const {name,age,email,password}=req.body;
        const {id} = req.params; //params == é o q ta na rota
        const updateUser = await user.findOneAndUpdate(
            { _id: id },
            { name,age,email,password },
            { new: true }, //mostra a idade nova no insonima 
            
          );
          return res.json({ msg: `Usuario atualizado com sucesso`, updateUser });
    }catch(e){
        return res.status(500).json({msg:`ocorreu um erro estranh ${e}`});
    }
})


app.delete("/delete/:id", async(req,res)=>{
    try{
        const {id} = req.params;
        const deletedUser = await user.findOneAndDelete({_id:id});
        return res.json({msg:"Usuario deletado com sucesso", deletedUser});

    }catch(e){
        return res.status(500).json({msg:`ocorreu um erro estranh ${e}`});
    }
    })
//hospedar em servidor ativo
app.listen(3333, () => {
  console.log("Deu certo :3");
}); //testar se a porta ta funcionando
