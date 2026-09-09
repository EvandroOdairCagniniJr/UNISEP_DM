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

app.get("/listar/:id", async (req, res) => {

    const { id } = req.params;

    const produto = await mySql.select("*")
        .from('produtos')
        .where({ id });

    res.send(produto);

});

app.post("/cadastrar", async (req, res)=>{

    const { nome, preco, qtd_estoque } = req.body;

    const produto = await mySql.insert({ 
        nome,
        preco, 
        qtd_estoque 
    }).into("produto");

    res.send({ msg: `Produto ${nome} cadastrado com sucesso` });
});

app.put("/atualizar/:id", async (req, res) => {

    const { id, nome, preco, qtd_estoque } = req.body;

    const produto = await mySql('produto')
        .where({ id })
        .update({ 
            nome,
            preco, 
            qtd_estoque 
        });

    res.send(produto);


app.listen(8080, () =>{
    console.log("O servidor está rodando no porta 8080");
});