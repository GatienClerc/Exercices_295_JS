/*
* Auteur : "Gatien Clerc"
* Date    : "05.12.25"
* Project : "ex.3 API main"
* Doc     : "ex.3 mini serveur web communique avec API"
* Version : "V0.1"
*/
"use strict";

//import de fichier
import express from "express";
// création de variable
const app = express()
const port = 3000

import {routeur} from "./routes/router.js";

app.use(express.json());

//route home
app.get('/', (req, res) => {
    res.send('Hello World! Bivenue sur mon serveur')
})

app.get('/api',(req, res) => {
    res.redirect(`http://localhost:${port}/`)
})

app.use('/api/activities', routeur);

app.use((err,req, res, next) => {
    res.status(404).json({
        error: "No found",
        message:"No such route found",
        status:"error 404"
    });
})

// Lancement du serveur
app.listen(port, () => {
    console.log(`the serveur is running on port ${port}`);
});