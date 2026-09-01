const express = require('express');

const app =  new express();

app.use(express.json());

var contador_id = 1;
var data = [{
    id: 1,
    nome: "Evandro Jr",
    cpf: "50550550555",
    status: "true"
}];

app.get("/listar",(request, response)=>{
    return response.send(data);
});

app.get("/listar/:id",(request, response)=>{
    const { id } = request.params;

    const pessoa = data.filter((item)=>{
        return item.id == id;
    });

    if (pessoa.length == 0){
        response.status(400).send({
            msg: `Pesssoa do código ${id} não encontrada!`
        });
    }

    response.send(pessoa);

   
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

    if(!nome){
        return response.status(300).send("O campo NOME é obrigatório!");
    }else if (!cpf) {
        return response.status(300).send("O campo CPF é obrigatório!");
    }

    contador_id++

    data.push({
        id: contador_id,
        nome,
        cpf,
        status
    });

    return response.send("Pessoa cadastrada com sucesso");
});

app.listen(8080, () => {
    console.log('Servidor está rodando na porta 8080');
});


// Status 500 - Erro interno
// Status 200 - Sucesso