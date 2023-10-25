const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());

app.use(cors());

const db = new Pool({
  user: 'EU SOU BURRO MAIS NÃO A ESSE PONTO KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK',
  host: 'localhost',
  database: 'CAI FORA',
  password: 'CAI FORA',
  port: 5432,
});

app.post('/pessoas', async (req, res) => {
  const { nome, email } = req.body;

  try {
    const result = await db.query(
      'INSERT INTO pessoas (nome, email) VALUES ($1, $2) RETURNING id',
      [nome, email]
    );
    res.json({ id: result.rows[0].id });
  } catch (error) {
    console.error('Erro ao inserir pessoa: ', error);
    res.status(500).json({ error: 'Erro interno' });
  }
});

app.get('/pessoas', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM pessoas');
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao listar pessoas: ', error);
    res.status(500).json({ error: 'Erro interno' });
  }
});

app.listen(3001, () => {
  console.log('Servidor Node.js rodando na porta 3001');
});
