// node server.js

const express = require('express');
const app = express();

//Normalmente pega de um banco de dados
const data = require("./data.json");

//Express precisa usar o json
app.use(express.json());

// Verbos HTTP
// GET: Receber dados de um Resource
// POST: Enviar dados ou informações para serem processados por um Resource
// PUT: Atualizar dados de um Resource
// DELETE: Deletar um resource

// http://localhost:3000/clients   
// O link todo é um URI
// clients é o endpoint 
// clients é o nome do Resource

// request, response

app.get("/clients", function(req, res){
    //JSON
    res.json(data);
});

app.get("/clients/:id", function(req, res){
    const { id } = req.params;
    const client = data.find(cli => cli.id == id);

    if(!client) return res.status(204).json();

    res.json(client);
});

app.post("/clients", function(req, res){
    const {name,email}  = req.body;

    //salvar

    res.json({name,email});
});


app.put("/clients/:id", function(req, res){
    const { id } = req.params;
    const client = data.find(cli => cli.id == id);

    if(!client) return res.status(204).json();

    const {name}  = req.body;

    client.name = name;

    res.json(client);
});


app.delete("/clients/:id", function(req, res){
    const { id } = req.params;
    const clientsFiltered = data.filter( client => client.id != id);

    res.json(clientsFiltered);
});


app.listen(3000, function(){
    console.log("Server is running");
});

