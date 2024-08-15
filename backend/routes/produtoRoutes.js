import express from 'express'
const router = express.Router();
import asyncHandler from '../middleware/asyncHandler.js';
import Produto from '../models/produtoModel.js'

router.get('/', asyncHandler (async(req, res) => {
    const produtos = await Produto.find({});
    res.json(produtos)
}))

router.get('/:id', asyncHandler( async(req, res) => {
    const produto = await Produto.findById(req.params.id);
    if(produto){
        res.json(produto)
    } else {
        res.status(404)
        throw new Error('Produto nao encontrado')
    }
   
}))

export default router