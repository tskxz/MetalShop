import express from 'express'
const router = express.Router();
import {getProdutos, getProduto, criarProduto, atualizarProduto} from '../controllers/produtoController.js'
import {protect, admin} from '../middleware/authMiddleware.js'

router.route('/').get(getProdutos).post(protect, admin, criarProduto);
router.route('/:id').get(getProduto).put(protect, admin, atualizarProduto);

export default router