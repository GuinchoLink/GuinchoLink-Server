import express from "express";
import { ClienteController } from './controllers/ClienteController.js';
import TipoServicoController from './controllers/TipoServicoController.js';
import ServicoController from './controllers/ServicoController.js'; 

const routes = express.Router();

routes.get('/clientes', ClienteController.findAll);
routes.get('/clientes/:id', ClienteController.findByPk);
routes.post('/clientes', ClienteController.create);
routes.put('/clientes/:id', ClienteController.update);
routes.delete('/clientes/:id', ClienteController.delete);

// Rotas para TipoServico
routes.post('/tipos-servico', TipoServicoController.create);
routes.get('/tipos-servico', TipoServicoController.findAll);
routes.get('/tipos-servico/:id', TipoServicoController.findById);
routes.put('/tipos-servico/:id', TipoServicoController.update);
routes.delete('/tipos-servico/:id', TipoServicoController.delete);

// Rotas para Servico
routes.post('/servicos', ServicoController.create);
routes.get('/servicos', ServicoController.findAll);
routes.get('/servicos/:id', ServicoController.findById);
routes.put('/servicos/:id', ServicoController.update);
routes.delete('/servicos/:id', ServicoController.delete);

export default routes;