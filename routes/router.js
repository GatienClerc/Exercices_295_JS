/*
* Auteur : "Gatien Clerc"
* Date    : "05.12.25"
* Project : "ex.3 API redirecion"
* Doc     : "ex.3 mini serveur web communique avec API"
* Version : "V2"
*/
import express from 'express';
import {activities} from "../DB/mock-activities.js"
import {db} from "../DB/controleur_db.js";

"use strict";
const routeur = express.Router();

// route pour les activitie
routeur.get('/',async(req, res) => {
    const activities = await db.getAllActivities();
    res.json(activities)
})

routeur.get('/:id', async(req, res) => {
    const id = parseInt(req.params.id);
    const activity = await db.getActivityById(id);

    res.json({activity});
});

routeur.post('/create', async(req, res) => {
    const newActivity = await db.createActivity(req.body);
    const message = `L'activité ${newActivity.name} a bien été créée !`;
    res.json({message : message, activity : newActivity});
});

routeur.put('/:id', async(req, res) => {
    const updateActivity = await db.updateActivity(req.params.id, req.body);
    res.json({ message: 'activity updated', updateActivity : updateActivity });
});

routeur.delete('/:id', async(req, res) => {
    let deleteActivity = await db.deleteActivity(req.params.id);
    res.json({ message: 'Activity deleted' });
});

export {routeur};