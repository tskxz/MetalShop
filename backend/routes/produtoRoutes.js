import express from 'express'
const router = express.Router();
import {getProdutos, getProduto, criarProduto} from '../controllers/produtoController.js'
import {protect, admin} from '../middleware/authMiddleware.js'

router.route('/').get(getProdutos).post(protect, admin, criarProduto);
router.route('/:id').get(getProduto);

export default router