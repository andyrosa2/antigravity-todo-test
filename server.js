const express = require('express');
const { Pool } = require('pg');
const app = express();

console.log('DATABASE_URL:', process.env.DATABASE_URL);
console.log('NODE_ENV:', process.env.NODE_ENV);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function initializeDatabase() {
  console.log('Initializing database...');
  await pool.query(`
    CREATE TABLE IF NOT EXISTS notes (
      id SERIAL PRIMARY KEY,
      content TEXT
    )
  `);
  console.log('Database initialized');
}

app.use(express.json());
app.use(express.static('.'));

app.get('/notes', async (_, res) => {
  console.log('GET /notes');
  res.json((await pool.query('SELECT * FROM notes')).rows);
});

app.post('/notes', async (req, res) => {
  console.log('POST /notes', req.body);
  await pool.query('INSERT INTO notes (content) VALUES ($1)', [req.body.content]);
  res.end();
});

const PORT = process.env.PORT || 3000;

process.on('uncaughtException', err => {
  console.error('Uncaught exception:', err);
});

process.on('unhandledRejection', err => {
  console.error('Unhandled rejection:', err);
});

process.on('exit', code => {
  console.log('Process exiting with code:', code);
});

console.log('Starting server...');

initializeDatabase()
  .then(() => {
    console.log('About to listen on port', PORT);
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('Failed to initialize database:', err);
    process.exit(1);
  });
