//LEANDRO CARVALHO FRAGA

import { VeiculoClienteService } from "../services/VeiculoClienteService.js";

class VeiculoClienteController {

  static async findAll(req, res) {
    VeiculoClienteService.findAll()
      .then(objs => res.json(objs))
      .catch(err => res.status(400).json({ err: err.message }));
  }

  static async findByPk(req, res) {
    VeiculoClienteService.findByPk(req)
      .then(obj => res.json(obj))
      .catch(err => res.status(400).json({ err: err.message }));
  }

  static async create(req, res) {
    VeiculoClienteService.create(req)
      .then(obj => res.json(obj))
      .catch(err => res.status(400).json({ err: err.message }));
  }

  static async update(req, res) {
    VeiculoClienteService.update(req)
      .then(obj => res.json(obj))
      .catch(err => res.status(400).json({ err: err.message }));
  }

  static async delete(req, res) {
    VeiculoClienteService.delete(req)
      .then(obj => res.json(obj))
      .catch(err => res.status(400).json({ err: err.message }));
  }

  static async findByClientId(req, res) {
    VeiculoClienteService.findByClientId(req)
      .then(result => res.json(result))
      .catch(err => res.status(400).json({ err: err.message }));
  }

}


export { VeiculoClienteController };