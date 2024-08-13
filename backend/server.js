import express from 'express';
const port = 5000;

const app = express();

app.get('/', (req, res) => {
    res.send('API está a rodar...');
});

app.listen(port, () => console.log(`Servidor a rodar na porta ${port}`))