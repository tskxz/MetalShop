import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import produtos from './data/produtos.js';
import connectDB from './config/db.js';

import produtoRoutes from './routes/produtoRoutes.js'

const port = process.env.PORT || 5000;

connectDB(); // Conexão da base de dados

const app = express();

app.get('/', (req, res) => {
    res.send('API está a rodar...');
});

app.use('/api/produtos', produtoRoutes);

app.listen(port, () => console.log(`Servidor a rodar na porta ${port}`))