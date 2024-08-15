import express from 'express'
const router = express.Router();
import {getProdutos, getProduto} from '../controllers/produtoController.js'

router.route('/').get(getProdutos);
router.route('/:id').get(getProduto);

export default router