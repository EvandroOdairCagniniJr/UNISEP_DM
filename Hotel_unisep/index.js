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
    try {
        const quartos = await mysql
            .select("*")
            .from("quarto");

        res.send(quartos);
    } catch (error) {
        res.status(500).send({
            msg: "Erro ao buscar os quartos!",
            erro: error.message
        });
    }
});

app.get("/quartos/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const quarto = await mysql
            .select("*")
            .from("quarto")
            .where({ id });

        res.send(quarto);
    } catch (error) {
        res.status(500).send({
            msg: "Erro ao buscar o quarto!",
            erro: error.message
        });
    }
});

app.post("/quartos", async (req, res) => {
    try {
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
    } catch (error) {
        res.status(500).send({
            msg: "Erro ao cadastrar o quarto!",
            erro: error.message
        });
    }
});

app.put("/quartos/:id", async (req, res) => {
    try {
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
    } catch (error) {
        res.status(500).send({
            msg: "Erro ao atualizar o quarto!",
            erro: error.message
        });
    }
});

app.delete("/quartos/:id", async (req, res) => {
    try {
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
    } catch (error) {
        res.status(500).send({
            msg: "Erro ao excluir o quarto!",
            erro: error.message
        });
    }
});

app.listen(8080, () => {
    console.log("O servidor está rodando na porta 8080");
});