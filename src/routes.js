import express from "express";
import { ClienteController } from './controllers/ClienteController.js';
import { AdministradorController } from "./controllers/AdministradorController.js";
import { FuncionarioController } from "./controllers/FuncionarioController.js";
import { EmpresaController } from "./controllers/EmpresaController.js";
import { VeiculoClienteController } from "./controllers/VeiculoClienteController.js";
import { VeiculoEmpresaController } from "./controllers/VeiculoEmpresaController.js";
import TipoServicoController from './controllers/TipoServicoController.js';
import ServicoController from './controllers/ServicoController.js'; 
import FimServicoController from './controllers/FimServicoController.js';
import { FeedbackController } from './controllers/FeedbackController.js'; 

const routes = express.Router();

routes.get('/clientes', ClienteController.findAll);
routes.get('/clientes/:id', ClienteController.findByPk);
routes.post('/clientes', ClienteController.create);
routes.put('/clientes/:id', ClienteController.update);
routes.delete('/clientes/:id', ClienteController.delete);

routes.get('/empresa', EmpresaController.findAll);
routes.get('/empresa/:id', EmpresaController.findByPk);
routes.post('/empresa', EmpresaController.create);
routes.put('/empresa/:id', EmpresaController.update);
routes.delete('/empresa/:id', EmpresaController.delete);

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

routes.get('/veiculoCliente', VeiculoClienteController.findAll);
routes.get('/veiculoCliente/clienteId', VeiculoClienteController.findByClientId);
routes.get('/veiculoCliente/:id', VeiculoClienteController.findByPk);
routes.post('/veiculoCliente', VeiculoClienteController.create);
routes.put('/veiculoCliente/:id', VeiculoClienteController.update);
routes.delete('/veiculoCliente/:id', VeiculoClienteController.delete);

routes.get('/veiculoEmpresa', VeiculoEmpresaController.findAll);
routes.get('/veiculoEmpresa/status', VeiculoEmpresaController.findByStatus);
routes.get('/veiculoEmpresa/:id', VeiculoEmpresaController.findByPk);
routes.post('/veiculoEmpresa', VeiculoEmpresaController.create);
routes.put('/veiculoEmpresa/:id', VeiculoEmpresaController.update);
routes.delete('/veiculoEmpresa/:id', VeiculoEmpresaController.delete);

// Rotas para TipoServico
routes.post('/tipos-servico', TipoServicoController.create);
routes.get('/tipos-servico', TipoServicoController.findAll);
routes.get('/tipos-servico/:id', TipoServicoController.findById);
routes.put('/tipos-servico/:id', TipoServicoController.update);
routes.delete('/tipos-servico/:id', TipoServicoController.delete);

// Rotas para Servico
routes.post('/servicos', ServicoController.create);
routes.get('/servicos', ServicoController.findAll);
routes.get('/servicos/cliente/:clienteId', ServicoController.findByCliente); // Rota específica deve vir antes da genérica
routes.get('/servicos/status/:status', ServicoController.findByStatus); // Nova rota para filtrar por status
routes.get('/servicos/:id', ServicoController.findById);
routes.put('/servicos/:id', ServicoController.update);
routes.delete('/servicos/:id', ServicoController.delete);

// Rotas para FimServico
routes.post('/fim-servicos', FimServicoController.create);
routes.get('/fim-servicos', FimServicoController.findAll);
routes.get('/fim-servicos/cliente-statistics/:clienteId', FimServicoController.getClienteStatistics);
routes.get('/fim-servicos/cliente-statistics', FimServicoController.getClienteStatistics);
routes.get('/fim-servicos/servico/:servicoId', FimServicoController.findByServicoId);
routes.get('/fim-servicos/cliente/:clienteId', FimServicoController.findByClienteId);
routes.get('/fim-servicos/:id', FimServicoController.findById);
routes.put('/fim-servicos/:id', FimServicoController.update);
routes.delete('/fim-servicos/:id', FimServicoController.delete);

// Rotas para Feedback
routes.post('/feedback', FeedbackController.create);
routes.get('/feedback', FeedbackController.findAll);
routes.get('/feedback/nota', FeedbackController.findByNota);
routes.get('/feedback/:id', FeedbackController.findByPk);
routes.put('/feedback/:id', FeedbackController.update);
routes.delete('/feedback/:id', FeedbackController.delete);

export default routes;