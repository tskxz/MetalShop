import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import produtos from './data/produtos.js';
import connectDB from './config/db.js';

const port = process.env.PORT || 5000;

connectDB(); // Conexão da base de dados

const app = express();

app.get('/', (req, res) => {
    res.send('API está a rodar...');
});

app.get('/api/produtos', (req, res) => {
    res.json(produtos)
})

app.get('/api/produtos/:id', (req, res) => {
    const produto = produtos.find((p) => p._id === req.params.id);
    res.json(produto)
})

app.listen(port, () => console.log(`Servidor a rodar na porta ${port}`))