/*
* Auteur : "Gatien Clerc"
* Date    : "05.12.25"
* Project : "ex.3 db"
* Doc     : "ex.3 mini serveur web communique avec API"
* Version : "V0.2"
*/
import mysql from 'mysql2/promise';

const con = mysql.createPool ({
    host: "localhost",
    user: "Gatien",
    password: "L$pace4MySQL",
    port: 3306,
    database: "app_activities",
})

const db = {

    getAllActivities: async (name) => {
        try {
            if (name){
                const [rows] = await con.query('SELECT * FROM activities WHERE name LIKE ?', `%${name}%`);
                return rows;
            } else{
                const [rows] = await con.query('SELECT * FROM activities');
                return rows;
            }

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getActivityById: async ( id) => {
        try {
            const [rows] = await con.query('SELECT * FROM activities WHERE id = ?', [id]);
            return rows[0];
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    createActivity: async ( {name, date, duration}) => {
        try {
            const [result] = await con.query(
                'INSERT INTO activities (name, activity_date, duration) VALUES (?, ?, ?)',
                [name, date, duration]
            );
            return {id: result.insertId, name, date, duration};
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    updateActivity: async (id, {name, date, duration}) => {
        try {
            await con.query(
                'UPDATE activities SET name = ?, activity_date = ?, duration = ? WHERE id = ?',
                [name, date, duration, id]
            );
            return {id, name, date, duration};
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    deleteActivity: async (id) => {
        try {
            await con.query('DELETE FROM activities WHERE id = ?', [id]);
            return {success: true};
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
}

export { db }