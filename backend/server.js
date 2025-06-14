// Importa as bibliotecas necessárias
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors'); // Serrve para permitir conexão com o front-end

// Inicializa o servidor
const app = express();
const port = 3000;

// Middlewares
app.use(cors()); // Habilita CORS (comunicação com front-end)
app.use(express.json()); // Permite receber JSON no body das requisições

// ✅ CONFIGURAÇÃO DO BANCO DE DADOS 
const pool = new Pool({
  user: 'postgres',       // Seu usuário do PostgreSQL
  password: 'Root',  // Senha definida ao instalar o PostgreSQL
  host: 'localhost',      // Como o banco de dados está na minha máquina deixar assim
  database: 'mulheres_tech', // Nome do banco que criei
  port: 5432,             // Porta padrão do PostgreSQL
});

// 👇 ROTAS DA API (Todas já com tratamento de erros)

// Rota de teste
app.get('/', (req, res) => {
  res.send('Backend do projeto Mulheres na Tech está rodando! 🚀');
});

// Rota para buscar vagas por localização
app.get('/vagas-proximas', async (req, res) => {
  const { lat, long, raio } = req.query;
  
  if (!lat || !long || !raio) {
    return res.status(400).json({ error: 'Parâmetros faltando: lat, long ou raio' });
  }

  try {
    const query = `
      SELECT id, titulo, cidade, estado 
      FROM vagas 
      WHERE ST_DWithin(
        localizacao,
        ST_SetSRID(ST_MakePoint($1, $2), 4326),
        $3 * 1000
      );
    `;
    const result = await pool.query(query, [long, lat, raio]);
    res.json(result.rows);
  } catch (err) {
    console.error('Erro ao buscar vagas:', err);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
});

// Rota para cadastrar novas vagas (exemplo adicional)
app.post('/vagas', async (req, res) => {
  const { titulo, empresa_id, cidade, estado, lat, long } = req.body;

  try {
    const query = `
      INSERT INTO vagas (titulo, empresa_id, cidade, estado, localizacao)
      VALUES ($1, $2, $3, $4, ST_SetSRID(ST_MakePoint($5, $6), 4326)
      RETURNING *;
    `;
    const result = await pool.query(query, [titulo, empresa_id, cidade, estado, long, lat]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao cadastrar vaga:', err);
    res.status(500).json({ error: 'Erro ao criar vaga' });
  }
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});