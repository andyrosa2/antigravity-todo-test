const express = require('express');
const { Pool } = require('pg');
const app = express();
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

app.use(express.json());
app.use(express.static('.'));

app.get('/notes', async (_, res) => res.json((await pool.query('SELECT * FROM notes')).rows));

app.post('/notes', async (req, res) => {
  await pool.query('INSERT INTO notes (content) VALUES ($1)', [req.body.content]);
  res.end();
});

app.listen(process.env.PORT || 3000);
