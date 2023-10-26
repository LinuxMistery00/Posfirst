const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());

app.use(cors());

const db = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'posfirst',
  password: 'postgre',
  port: 5432,
});

app.post('/users', async (req, res) => {
  const { title, text } = req.body;

  try {
    const result = await db.query(
      'INSERT INTO users (title, text) VALUES ($1, $2) RETURNING id',
      [title, text]
    );
    res.json({ id: result.rows[0].id });
  } catch (error) {
    console.error('Erro ao inserir usuário: ', error);
    res.status(500).json({ error: 'Erro interno' });
  }
});

app.get('/users', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao listar usuários: ', error);
    res.status(500).json({ error: 'Erro interno' });
  }
});

app.listen(3001, () => {
  console.log('Servidor Node.js rodando na porta 3001');
});
