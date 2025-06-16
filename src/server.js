import express from "express";
import routes from './routes.js';
import errorHandler from '../src/_middleware/error-handler.js';

import './config/database.js';

const app = express();

// Cabeçalhos CORS
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }
    
    next();
});

app.use(express.json()); // possibilitar recuperação do corpo da solicitação (request.body) como um objeto JSON
app.use(routes); // especificar as rotas da API REST
app.use(errorHandler)
app.listen(3333, () => console.log("Server is running on PORT 3333")); //  iniciar um socket que escuta as conexões em um caminho fornecido

