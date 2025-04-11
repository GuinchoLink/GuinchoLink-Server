//LEANDRO CARVALHO FRAGA

import { VeiculoCliente } from "../models/VeiculoCliente.js";

class VeiculoClienteService {
  
  static async findAll(req, res) {
    const objs = await VeiculoCliente.findAll();
    return objs;
  }

  static async findByPk(req, res) {
    const { id } = req.params;
    const obj = await VeiculoCliente.findByPk(id);
    return obj;
  }

  static async create(req, res) {
    const { placa, cor, modelo, tipoDeVeiculo } = req.body;

    const objByPlaca = await VeiculoCliente.findAll({ where: { placa: placa } });
    if(objByPlaca.length == 1){
      throw new Error("Já existe um veículo cadastrado com esta placa");
    }

    const obj = await VeiculoCliente.create({ placa, cor, modelo, tipoDeVeiculo });
    return obj;
  }

  static async update(req, res) {
    const { id } = req.params;
    const { placa, cor, modelo, tipoDeVeiculo } = req.body;
    var obj = await VeiculoCliente.findOne({ where: { id: id } });
    Object.assign(obj, { placa, cor, modelo, tipoDeVeiculo });
    obj = await obj.save();
    return obj;
  }

  static async delete(req, res) {
    const { id } = req.params;
    var obj = await VeiculoCliente.findByPk(id);
    if (!obj) throw new Error('Veículo não encontrado!');
    
    obj = await obj.destroy();
    return obj;
  }

}

export { VeiculoClienteService };
