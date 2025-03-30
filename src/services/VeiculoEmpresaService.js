import { VeiculoEmpresa } from "../models/VeiculoEmpresa.js";

class VeiculoEmpresaService {

  static async findAll(req, res) {
    const objs = await VeiculoEmpresa.findAll();
    return objs;
  }

  static async findByPk(req, res) {
    const { id } = req.params;
    const obj = await VeiculoEmpresa.findByPk(id);
    return obj;
  }

  static async create(req, res) {
    const { placa, cor, modelo, tipoDeVeiculo } = req.body;

    // Regra de negócio: não podem existir dois VeiculoEmpresas com a mesma placa
    const objByPlaca = await VeiculoEmpresa.findAll({ where: { placa: placa } });
    if (objByPlaca.length == 1) {
      throw new Error("Já existe um VeiculoEmpresa com esta placa");
    }

    const obj = await VeiculoEmpresa.create({ placa, cor, modelo, tipoDeVeiculoServico, statusVeiculo });
    return obj;
  }

  static async update(req, res) {
    const { id } = req.params;
    const { placa, cor, modelo, tipoDeVeiculoServico, statusVeiculo } = req.body;
    var obj = await VeiculoEmpresa.findOne({ where: { id: id } });
    Object.assign(obj, { placa, cor, modelo, tipoDeVeiculo, tipoDeVeiculoServico, statusVeiculo });
    obj = await obj.save();
    return obj;
  }

  static async delete(req, res) {
    const { id } = req.params;
    var obj = await VeiculoEmpresa.findByPk(id);
    obj = await obj.destroy();
    return obj;
  }

}

export { VeiculoEmpresaService };
