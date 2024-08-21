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

// @desc    Criar um prodduto
// @route   POST /api/produtos
// @access  Private/Admin
const criarProduto = asyncHandler(async(req, res) => {
    const produto = new Produto({
        nome: 'Sample name',
        preco: 0,
        utilizador: req.utilizador._id,
        imagem: '/images/sample.jpg',
        banda: 'Sample banda',
        categoria: 't-shirt',
        genero: 'Homem',
        cor: 'SAMPLE',
        tamanho: 'SAMPLE',
        emStock: 0,
        numReviews: 0,
        descricao: 'Sample descricao',
    })
    const produtoCriado = await produto.save()
    res.json(produtoCriado)
})

// @desc    Atualizar produto
// @route   PUT /api/produtos/:id
// @access  Private/Admin
const atualizarProduto = asyncHandler(async(req, res) => {
    const {nome, preco, descricao, imagem, banda, categoria, genero, cor, tamanho, emStock} = req.body
    const produto = await Produto.findById(req.params.id)
    if(produto){
        produto.nome = nome,
        produto.preco = preco,
        produto.descricao = descricao,
        produto.imagem = imagem,
        produto.banda = banda,
        produto.categoria = categoria,
        produto.genero = genero,
        produto.cor = cor,
        produto.tamanho = tamanho,
        produto.emStock = emStock
        
        const produtoAtualizado = await produto.save()
        res.json(produtoAtualizado)
    } else {
        res.status(404)
        throw new Error('resource n encontrado')
    }
})


export {getProdutos, getProduto, criarProduto, atualizarProduto}