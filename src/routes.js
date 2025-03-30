import express from "express";
import { ClienteController } from './controllers/ClienteController.js';
import { AdministradorController } from "./controllers/AdministradorController.js";
import { FuncionarioController } from "./controllers/FuncionarioController.js";

const routes = express.Router();

routes.get('/clientes', ClienteController.findAll);
routes.get('/clientes/:id', ClienteController.findByPk);
routes.post('/clientes', ClienteController.create);
routes.put('/clientes/:id', ClienteController.update);
routes.delete('/clientes/:id', ClienteController.delete);

routes.get('/administrador', AdministradorController.findAll);
routes.get('/administrador/:id', AdministradorController.findByPk);
routes.post('/administrador', AdministradorController.create);
routes.put('/administrador/:id', AdministradorController.update);
routes.delete('/administrador/:id', AdministradorController.delete);

routes.get('/funcionario', FuncionarioController.findAll);
routes.get('/funcionario/:id', FuncionarioController.findByPk);
routes.post('/funcionario', FuncionarioController.create);
routes.put('/funcionario/:id', FuncionarioController.update);
routes.delete('/funcionario/:id', FuncionarioController.delete);

export default routes;