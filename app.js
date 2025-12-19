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
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import {routeur} from "./routes/router.js";

// création de variable
const app = express()
const port = 3000

app.use(express.json());

//route home
app.get('/', (req, res) => {
    res.send('Hello World! Bivenue sur mon serveur')
})

app.get('/api',(req, res) => {
    res.redirect(`http://localhost:${port}/`)
})

// Configuration de Swagger
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Activités Sportives',
            version: '1.0.0',
            description: 'Documentation de notre API pour gérer les activités',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Serveur de développement',
            },
        ],
    },
    apis: ['./routes/*.js'], // Chemins vers vos fichiers de routes
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
// Route pour accéder à la documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.listen(3000, () => {
    console.log('Serveur démarré sur http://localhost:3000');
    console.log(' Documentation : http://localhost:3000/api-docs');
});

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