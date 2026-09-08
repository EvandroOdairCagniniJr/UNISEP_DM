import express from "express";
import knex from "knex";

const mySql = knex({
    client: "mysql2",
    connection: {
        host: "localhost",
        user: "root",
        password: "123456",
        database: "mercado"
    }
});

async function testaConexaoComBancoDeDados() {
    try {
        await mySql.select("SELECT 0 AS RESULT");
        console.log("Sucesso ao conecatar ao banco de dados!");
    } catch (error) {
        console.log("Erro ao realizar conexão com banco de dados!");
    }
}

testaConexaoComBancoDeDados();

const app = new express();

app.use(express.json());

app.get("/listar", (req, res)=>{

    const produtos = [];

    res.send(produtos);

});

app.listen(8080, () =>{
    console.log("O servidor está rodando no porta 8080");
});