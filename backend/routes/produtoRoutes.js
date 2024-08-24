import express from 'express'
const router = express.Router();
import {getProdutos, getProduto, criarProduto, atualizarProduto, deleteProduto, criarProdutoReview, getTopProdutos} from '../controllers/produtoController.js'
import {protect, admin} from '../middleware/authMiddleware.js'

router.route('/').get(getProdutos).post(protect, admin, criarProduto);
router.get('/top', getTopProdutos)
router.route('/:id').get(getProduto).put(protect, admin, atualizarProduto).delete(protect, admin, deleteProduto);
router.route('/:id/reviews').post(protect,criarProdutoReview)

export default router