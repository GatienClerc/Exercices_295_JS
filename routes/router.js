/*
* Auteur  : "Gatien Clerc"
* Date    : "05.12.25"
* Project : "ex.3 API redirection"
* Doc     : "ex.3 mini serveur web communique avec API"
* Version : "V2"
*/
"use strict";

import express from 'express';
import { activities } from "../DB/mock-activities.js";
import { db } from "../DB/controleur_db.js";

const routeur = express.Router();

/**
 * @swagger
 * tags:
 *   name: Activities
 *   description: API de gestion des activités sportives
 *
 * components:
 *   schemas:
 *     Activity:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 123
 *         name:
 *           type: string
 *           example: "Ski alpin"
 *         category:
 *           type: string
 *           example: "hiver"
 *         price:
 *           type: number
 *           example: 45
 *     ActivityCreate:
 *       type: object
 *       required:
 *         - name
 *         - category
 *       properties:
 *         name:
 *           type: string
 *           example: "Ski alpin"
 *         category:
 *           type: string
 *           example: "hiver"
 *         price:
 *           type: number
 *           example: 45
 *     ActivityUpdate:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: "Ski freestyle"
 *         category:
 *           type: string
 *           example: "hiver"
 *         price:
 *           type: number
 *           example: 49
 */

/**
 * @swagger
 * /api/activities:
 *   get:
 *     tags: [Activities]
 *     summary: Lister les activités
 *     description: Retourne la liste des activités, avec filtres optionnels par nom et limitation du nombre de résultats.
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: false
 *         description: Filtre les activités dont le nom contient cette valeur.
 *         example: js
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         required: false
 *         description: Limite le nombre de résultats retournés.
 *         example: 10
 *     responses:
 *       '200':
 *         description: Liste des activités
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Activity'
 */
routeur.get('/', async (req, res) => {
    const { name, limit } = req.query;
    const activities = await db.getAllActivities(name);
    let results = activities;

    if (limit) {
        results = results.slice(0, parseInt(limit, 10));
    }

    res.json(results);
});

/**
 * @swagger
 * /api/activities/{id}:
 *   get:
 *     tags: [Activities]
 *     summary: Récupérer une activité par ID
 *     description: Retourne une activité correspondant à l'identifiant fourni.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Identifiant de l'activité.
 *         example: 1
 *     responses:
 *       '200':
 *         description: Activité trouvée
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 activity:
 *                   $ref: '#/components/schemas/Activity'
 *       '404':
 *         description: Activité introuvable
 */
routeur.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const activity = await db.getActivityById(id);
    res.json({ activity });
});

/**
 * @swagger
 * /api/activities/create:
 *   post:
 *     tags: [Activities]
 *     summary: Créer une nouvelle activité
 *     description: Ajoute une activité à la base de données.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ActivityCreate'
 *     responses:
 *       '201':
 *         description: Activité créée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: L'activité Ski alpin a bien été créée !
 *                 activity:
 *                   $ref: '#/components/schemas/Activity'
 *       '400':
 *         description: Données invalides
 */
routeur.post('/create', async (req, res) => {
    const newActivity = await db.createActivity(req.body);
    const message = `L'activité ${newActivity.name} a bien été créée !`;
    res.status(201).json({ message, activity: newActivity });
});

/**
 * @swagger
 * /api/activities/{id}:
 *   put:
 *     tags: [Activities]
 *     summary: Mettre à jour une activité
 *     description: Met à jour une activité existante par son ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Identifiant de l'activité à mettre à jour.
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ActivityUpdate'
 *     responses:
 *       '200':
 *         description: Activité mise à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Activity updated
 *                 activity:
 *                   $ref: '#/components/schemas/Activity'
 *       '404':
 *         description: Activité introuvable
 *       '400':
 *         description: Données invalides
 */
routeur.put('/:id', async (req, res) => {
    const updateActivity = await db.updateActivity(req.params.id, req.body);
    res.json({ message: 'Activity updated', activity: updateActivity });
});

/**
 * @swagger
 * /api/activities/{id}:
 *   delete:
 *     tags: [Activities]
 *     summary: Supprimer une activité
 *     description: Supprime une activité existante par son ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Identifiant de l'activité à supprimer.
 *         example: 1
 *     responses:
 *       '200':
 *         description: Activité supprimée
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Activity deleted
 *       '404':
 *         description: Activité introuvable
 */
routeur.delete('/:id', async (req, res) => {
    await db.deleteActivity(req.params.id);
    res.json({ message: 'Activity deleted' });
});

export { routeur };
