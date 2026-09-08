const express = require("express");

const app = new express();

app.get("/", (request, response)=>{

    console.log(request);

    response.send("<h1>BOA NOITE PESSOAL, NÃO SE PREOCUPEM POIS PROGRAMAÇÃO É SIMPLES, NÓS QUE DIFICULTAMOS AS COISAS!</h1>");
});


app.listen(8080, () => {
    console.log("🚚 O servidor está rodando na porta 8080!");
});