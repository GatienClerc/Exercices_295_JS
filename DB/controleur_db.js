/*
* Auteur : "Gatien Clerc"
* Date    : "05.12.25"
* Project : "ex.3 db"
* Doc     : "ex.3 mini serveur web communique avec API"
* Version : "V0.2"
*/
import mysql from 'mysql2/promise';

try {
    const con = await mysql.createConnection({
        host: "localhost",
        user: "Gatien",
        password: "L$pace4MySQL",
        port: 3306,
        database: "app_activities",
    });

    await con.ping(); // Test rapide
    console.log("Connexion MySQL OK !");
    await con.end(); // Ferme la connexion
} catch (err) {
        console.error("Erreur de connexion MySQL :", err.message);
    }

const db = {

    getAllActivities: async () => {
        const [rows] = await con.query('SELECT * FROM activities');
        return rows;

        try {
            const activities = await db.getAllActivities();
            res.json(activities);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getActivityById: async (id) => {
        const [rows] = await con.query('SELECT * FROM activities WHERE id = ?', [id]);
        return rows[0];

        try {
            const activity = await db.getActivityById(req.params.id);
            if (!activity) {
                return res.status(404).json({ error: 'Activité non trouvée' });
            }
            res.json(activity);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }

    },

    createActivity: async ({name, date, duration}) => {
        const [result] = await con.query(
            'INSERT INTO activities (name, start_date, duration) VALUES (?, ?, ?)',
            [name, date, duration]
        );
        return {id: result.insertId, name, date, duration};

        try {
            const { name, date, duration } = req.body;
            const newActivity = await db.createActivity({ name, date, duration });
            res.status(201).json(newActivity);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }

    },

    updateActivity: async (id, {name, date, duration}) => {
        await con.query(
            'UPDATE activities SET name = ?, start_date = ?, duration = ? WHERE id = ?',
            [name, date, duration, id]
        );
        return {id, name, date, duration};

        try {
            const { name, date, duration } = req.body;
            const updated = await db.updateActivity(req.params.id, { name, date, duration
            });
            res.json(updated);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    deleteActivity: async (id) => {
        await con.query('DELETE FROM activities WHERE id = ?', [id]);
        return {success: true};

        try {
            await db.deleteActivity(req.params.id);
            res.json({ message: 'Activité supprimée avec succès' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
}

export { db }