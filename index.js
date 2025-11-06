const express = require('express');
const app = express();
app.use(express.json());
require('dotenv').config();
const port = process.env.PORT || 3000;
const db = require('./db');

app.post('/insert', (req, res) => {
    const { id, name } = req.body;
    const sql = 'INSERT INTO raman_demo (id, name) VALUES (?, ?)';
    db.query(sql, [id, name], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error inserting data');
        } else {
            res.send('✅ Data inserted successfully');
        }
    });
});

app.get('/users', (req, res) => {
    const sql = 'SELECT * FROM raman_demo';
    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error retrieving data');
        } else {
            res.json(results);
        }
    });
});
app.listen(port, () => {
    console.log("Server is Running.");
});