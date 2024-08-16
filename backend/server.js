import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import {notFound, errorHandler} from './middleware/errorMiddleware.js'

import produtoRoutes from './routes/produtoRoutes.js'
import utilizadorRoutes from './routes/utilizadorRoutes.js'

const port = process.env.PORT || 5000;

connectDB(); // Conexão da base de dados

const app = express();

// Body parser middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.send('API está a rodar...');
});

app.use('/api/produtos', produtoRoutes);
app.use('/api/utilizadores', utilizadorRoutes)
app.use(notFound)
app.use(errorHandler)

app.listen(port, () => console.log(`Servidor a rodar na porta ${port}`))