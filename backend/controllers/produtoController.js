import asyncHandler from '../middleware/asyncHandler.js';
import Produto from '../models/produtoModel.js'


// @desc    Ter todos os produtos
// @route   GET /api/produtos
// @access  Public
const getProdutos = asyncHandler(async(req, res) => {
    const produtos = await Produto.find({});
    res.json(produtos)
})

// @desc    Ter um produto específico
// @route   GET /api/produtos/:id
// @access  Public
const getProduto = asyncHandler(async(req, res) => {
    const produto = await Produto.findById(req.params.id);
    if(produto){
        res.json(produto)
    } else {
        res.status(404)
        throw new Error('Produto nao encontrado')
    }
})

export {getProdutos, getProduto}