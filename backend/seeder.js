import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import utilizadores from './data/utilizadores.js';
import produtos from './data/produtos.js';
import Utilizador from './models/utilizadorModel.js';
import Produto from './models/produtoModel.js';
import Encomenda from './models/encomendaModel.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async() => {
    try {
        await Encomenda.deleteMany();
        await Produto.deleteMany();
        await Utilizador.deleteMany();

        const utilizadoresCriado = await Utilizador.insertMany(utilizadores);
        
        const adminUtilizador = utilizadoresCriado[0]._id;

        const sampleProdutos = produtos.map((produto) => {
            return {...produto, utilizador: adminUtilizador};
        })

        await Produto.insertMany(sampleProdutos);
        console.log('Dados importados!'.green.inverse);
        process.exit();
    } catch (error) {
        console.log(`${error}`.red.inverse)
        process.exit(1);
    }
}

const destroyData = async() => {
    try {
        await Encomenda.deleteMany();
        await Produto.deleteMany();
        await Utilizador.deleteMany();

        console.log('Dados destruidos!'.red.inverse);
        process.exit();

    } catch (error) {
        console.log(`${error}`.red.inverse)
        process.exit(1);
    }
}

if(process.argv[2] === '-d'){
    destroyData();
} else {
    importData();
}