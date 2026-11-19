const express = require("express");

const app = new express();

app.use(express.json());

var contador_id = 1;
var data = [{
    id: 1,
    nome: "Guilherme",
    cpf: "99999999999",
    status: true
}];

app.get("/listar", (request, response) => {
    return response.send(data);
});

app.get("/listar/:id", (request, response) => {

    const { id } = request.params;

    const pessoa = data.filter((item) => {
        return item.id == id
    });

    if (pessoa.length == 0) {
        response.status(400).send({
            // msg : "Pessoa do código " + id + " não encontrada!"
            msg: `Pessoa do código ${id} não encontrada!`
        });
    }

    response.send(pessoa);

});

app.post("/cadastrar", (request, response) => {
    // const nome = request.body.nome;
    // const cpf = request.body.cpf;
    // const status = request.body.status;

    const { nome, cpf, status } = request.body;

    // console.log('DADOS DA PESSOA:');
    // console.log(nome);
    // console.log(cpf);
    // console.log(status);

    if (!nome) {
        return response.status(300).send("O campo NOME é obrigatorio!");
    } else if (!cpf) {
        return response.status(300).send("O campo CPF é obrigatorio!");
    }

    contador_id++

    data.push({
        id: contador_id,
        nome,
        cpf,
        status
    });

    return response.send("Pessoa cadastrada com sucesso!");
});


app.delete("/deletar/:id", (request, response) => {
    const { id } = request.params;

    const indice = data.findIndex((item) => {
        return item.id == id
    });

    if (indice !== -1) {
        data.splice(indice, 1);
    }

    response.send(data);
});

app.put("/atualizar", (request, response) => {
    const { id, nome, cpf, status } = request.body;

    if (!id) {
        response.status(300).send({
            msg: "O campo id é obrigatorio!"
        });
    }

    const indicePessoa = data.findIndex((item) => {
        return item.id == id;
    });

    if (indicePessoa == -1) {
        return response.status(400).send({
            msg: `O id ${id} não existe!`
        });
    }

    data[indicePessoa].nome = nome;
    data[indicePessoa].cpf = cpf;
    data[indicePessoa].status = status;


    return response.send(data[indicePessoa]);
});

app.listen(8080, () => {
    console.log("O sevidor está rodando na porta 8080!");
});


// Status  500 - Erro interno
// Status 200 - Sucesso 
// Status 400 - Não conseguiu econtrar determinada infromação
// Status 300 - Validações