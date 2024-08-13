import mongoose from 'mongoose';
import { timestamp } from 'rxjs';

const reviewSchema = mongoose.Schema({
    utilizador: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Utilizador"
    },
    nome: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
    },
    comentario: {
        type: String,
        required: true,
    },
}, {timestamp: true})

const produtoSchema = new mongoose.Schema({

    utilizador: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Utilizador"
    },

    nome: {
        type: String,
        required: true,
    },

    imagem: {
        type: String,
        required: true,
    },

    banda: {
        type: String,
        required: true,
    },

    categoria: {
        type: String,
        required: true,
    },

    descricao: {
        type: String,
        required: true,
    },

    genero: {
        type: String,
        required: true,
    },
    cor: {
        type: String,
        required: true
    },
    tamanho: {
        type: String,
        required: true,
    },
    descricao: {
        type: String,
        required: true
    },
    reviews: [reviewSchema],
    rating: {
        type: Number,
        required: true,
        default: 0,
    },
    numReviews: {
        type: Number,
        required: true,
        default: 0
    },
    preco: {
        type: Number,
        required: true,
        default: 0
    },
    emStock: {
        type: Number,
        required: true,
        default: 0
    }


}, {timestamps: true})

const Produto = mongoose.model("Produto", produtoSchema);
export default Produto;