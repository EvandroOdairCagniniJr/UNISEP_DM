import express from "express";

const app = new express();

app.use(express.json());

app.listen(8080, () =>{
    console.log("O servidor está rodando no porta 8080");
});