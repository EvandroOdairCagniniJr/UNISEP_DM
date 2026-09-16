import express from "express";
import knex from "knex";

const mysql = knex({
    client: "mysql2",
    connection: {
        host: "localhost",
        user: "root",
        password: "123456",
        database: "hotel"
    }
});

async function testaConexaoComBancoDeDados() {
    try {
        await mysql.raw("SELECT 0 AS RESULT");
        console.log("Sucesso ao conectar ao banco de dados!");
    } catch (error) {
        console.log("Erro ao realizar conexão com banco de dados!");
        console.log(error);
    }
}

testaConexaoComBancoDeDados();

const app = express();

app.use(express.json());

app.get("/quartos", async (req, res) => {
    const quartos = await mysql
        .select("*")
        .from("quarto");

    res.send(quartos);
});

app.get("/quartos/:id", async (req, res) => {
    const { id } = req.params;

    const quarto = await mysql
        .select("*")
        .from("quarto")
        .where({ id });

    res.send(quarto);
});

app.post("/quartos", async (req, res) => {
    const {
        numero,
        tipo,
        preco_diaria,
        disponivel
    } = req.body;

    await mysql
        .insert({
            numero,
            tipo,
            preco_diaria,
            disponivel
        })
        .into("quarto");

    res.send({
        msg: `Quarto ${numero} cadastrado com sucesso`
    });
});

app.put("/quartos/:id", async (req, res) => {
    const { id } = req.params;

    const {
        numero,
        tipo,
        preco_diaria,
        disponivel
    } = req.body;

    const quartoAtualizado = await mysql("quarto")
        .where({ id })
        .update({
            numero,
            tipo,
            preco_diaria,
            disponivel
        });

    if (quartoAtualizado == 1) {
        const quarto = await mysql
            .select("*")
            .from("quarto")
            .where({ id });

        res.send(quarto);
    } else {
        res.send({
            msg: "Não foi possível atualizar o quarto!"
        });
    }
});

app.delete("/quartos/:id", async (req, res) => {
    const { id } = req.params;

    const quartoExcluido = await mysql("quarto")
        .where({ id })
        .delete();

    if (quartoExcluido == 1) {
        res.send({
            msg: "Quarto excluído com sucesso!"
        });
    } else {
        res.send({
            msg: "Quarto não encontrado!"
        });
    }
});

app.listen(8080, () => {
    console.log("O servidor está rodando na porta 8080");
});