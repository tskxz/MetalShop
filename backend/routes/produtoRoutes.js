import express from 'express'
const router = express.Router();

import produtos from './data/produtos.js';

router.get('/', (req, res) => {
    res.json(produtos)
})

router.get('/:id', (req, res) => {
    const produto = produtos.find((p) => p._id === req.params.id);
    res.json(produto)
})

export default router