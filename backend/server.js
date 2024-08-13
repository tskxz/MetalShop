import express from 'express';
import produtos from './data/produtos.js';

const port = 5000;

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