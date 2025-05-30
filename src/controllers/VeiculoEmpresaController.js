//EDUARDO RODRIGUES ALMEIDA

import { VeiculoEmpresaService } from "../services/VeiculoEmpresaService.js";

class VeiculoEmpresaController {

  static async findAll(req, res) {
    VeiculoEmpresaService.findAll()
      .then(objs => res.json(objs))
      .catch(err => res.status(400).json({ err: err.message }));
  }

  static async findByPk(req, res) {
    VeiculoEmpresaService.findByPk(req)
      .then(obj => res.json(obj))
      .catch(err => res.status(400).json({ err: err.message }));
  }

  static async create(req, res) {
    VeiculoEmpresaService.create(req)
      .then(obj => res.json(obj))
      .catch(err => res.status(400).json({ err: err.message }));
  }

  static async update(req, res) {
    VeiculoEmpresaService.update(req)
      .then(obj => res.json(obj))
      .catch(err => res.status(400).json({ err: err.message }));
  }

  static async delete(req, res) {
    VeiculoEmpresaService.delete(req)
      .then(obj => res.json(obj))
      .catch(err => res.status(400).json({ err: err.message }));
  }

  static async findByStatus(req, res) {
    VeiculoEmpresaService.findByStatus(req)
      .then(result => res.json(result))
      .catch(err => res.status(400).json({ err: err.message }));
  }

}

export { VeiculoEmpresaController };