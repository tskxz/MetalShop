import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import {notFound, errorHandler} from './middleware/errorMiddleware.js'
import cookieParser from 'cookie-parser'

import produtoRoutes from './routes/produtoRoutes.js'
import utilizadorRoutes from './routes/utilizadorRoutes.js'
import encomendaRoutes from './routes/encomendaRoutes.js'

import uploadRoutes from './routes/uploadRoutes.js'

const port = process.env.PORT || 5000;

connectDB(); // Conexão da base de dados

const app = express();

// Body parser middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Cookie parser middleware
app.use(cookieParser());

app.use('/api/produtos', produtoRoutes);
app.use('/api/utilizadores', utilizadorRoutes)
app.use('/api/encomendas', encomendaRoutes);
app.use('/api/upload', uploadRoutes)

app.get('/api/config/paypal', (req, res) => res.send({clientId: process.env.PAYPAL_CLIENT_ID}))

const __dirname = path.resolve() // set __dirname to current directory
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '/frontend/build')))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    })
} else {
    app.get('/', (req, res) => {
        res.send('API está a rodar...');
    });
}

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => console.log(`Servidor a rodar na porta ${port}`))