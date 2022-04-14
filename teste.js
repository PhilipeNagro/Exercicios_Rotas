const users = [
    {
      "id": "64cf7d46-8127-4d69-88b6-f2c50dd26c96",
      "name": "PH",
      "username": "PH1",
      "todos": []
    },
    {
        "id": "64cf7d46-8127-4d69-88b6-f2c50dd26c96",
      "name": "Lucas",
      "username": "nunes",
      "todos": []
    }
  ];

  function procuraUsuario(username){
  
    // let usuario = users.find(function(usuario)){
    //   return user.username === username;
    // }
  
  
    // function achaUsername(usuario){
    //   return usuario.username === username;
    // }
  
    const resultado = users.find( usuario => usuario.username === username);
    
    return resultado;
  
  
  }
  

  const nomeProcurado = "ricardo";


  if(procuraUsuario(nomeProcurado)===undefined){
      console.log("nome null");
  }else{
    console.log(procuraUsuario(nomeProcurado));
  }
 