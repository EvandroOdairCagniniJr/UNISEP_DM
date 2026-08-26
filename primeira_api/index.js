const express = require('express');

const app =  new express();

app.use(express.json());

var data = [{
    nome: "Evandro Jr",
    cpf: "50550550555",
    status: "true"
}];

app.get("/listar",(request, response)=>{
    return response.send(data);
});

app.post("/cadastrar",(request, response)=>{
    //const nome = request.body.nome;
    //const cpf = request.body.cpf;
    //const status = request.body.status;

    const {nome, cpf, status} = request.body;

    //console.log('DADOS DA PESSOA:');
    //console.log(nome);
    //console.log(cpf);
    //console.log(status);

    if (cpf == undefined){
        return response.send("O campo CPF é obrigatório!");
    }

    data.push({
        nome,
        cpf,
        status
    });

    return response.send("Pessoa cadastrada com sucesso");
});

app.listen(8080, () => {
    console.log('Servidor está rodando na porta 8080');
});