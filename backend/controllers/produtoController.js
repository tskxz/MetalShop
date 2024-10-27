import asyncHandler from '../middleware/asyncHandler.js';
import Produto from '../models/produtoModel.js'


// @desc    Ter todos os produtos
// @route   GET /api/produtos
// @access  Public
const getProdutos = asyncHandler(async(req, res) => {
    const pageSize = 4;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword ? {nome: {$regex: req.query.keyword, $options: 'i'}} : {}
    const count = await Produto.countDocuments({...keyword})
    const produtos = await Produto.find({...keyword}).limit(pageSize).skip(pageSize * (page-1));
    res.json({produtos, page, pages: Math.ceil(count / pageSize)})
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

// @desc    Apagar produto
// @route   DELETE /api/produtos/:id
// @access  Private/Admin
const deleteProduto = asyncHandler(async(req, res) => {
   
    const produto = await Produto.findById(req.params.id)
    if(produto){
       await Produto.deleteOne({_id: produto._id})
       res.status(200).json({message: 'produto apagado'})

    } else {
        res.status(404)
        throw new Error('resource n encontrado')
    }
})

// @desc    Criar uma review
// @route   POST /api/produtos/:id/review
// @access  Private
const criarProdutoReview = asyncHandler(async(req, res) => {
   const {rating, comentario} = req.body
    const produto = await Produto.findById(req.params.id)
    if(produto){
       const alreadyReviewed = produto.reviews.find(
            (review) => review.utilizador.toString() === req.utilizador._id.toString()
        )

       if(alreadyReviewed){
        res.status(400)
        throw new Error('product already reviewed')
       }

       const review = {
        nome: req.utilizador.nome,
        rating: Number(rating),
        comentario,
        utilizador: req.utilizador._id
       }

       produto.reviews.push(review)
       produto.numReviews = produto.reviews.length;
       produto.rating = produto.reviews.reduce((acc, review) => acc+review.rating, 0) / produto.reviews.length
       await produto.save()
       res.status(201).json({message: 'Review added'})

    } else {
        res.status(404)
        throw new Error('resource n encontrado')
    }
})

// @desc    Ter top rated produtos
// @route   GET /api/produtos/top
// @access  Public
const getTopProdutos = asyncHandler(async(req, res) => {
    const produtos = await Produto.find({}).sort(({rating: -1})).limit(3);
    res.status(200).json(produtos)
})


export {getProdutos, getProduto, criarProduto, atualizarProduto, deleteProduto, criarProdutoReview, getTopProdutos}