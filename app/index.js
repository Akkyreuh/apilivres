const express = require('express');
const app = express();

app.use(express.json());

const livresRoutes = require('./Router/livresRoutes');

app.use('/', livresRoutes); 

app.get("/", (req, res) => {
    res.send("API de gestion de livres");
});

app.listen(8080, () => {
    console.log("Serveur lancé sur le port 8080");
});


