//EDUARDO RODRIGUES ALMEIDA

import { VeiculoEmpresa } from "../models/VeiculoEmpresa.js";
import { Servico } from "../models/Servico.js"; // Importa o modelo Servico

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

    const { placa, cor, modelo, tipoDeVeiculoServico, statusVeiculo } = req.body;
    // Regra de negócio: não podem existir dois veículos com a mesma placa
    const objByCpf = await VeiculoEmpresa.findAll({where : {placa: placa}});
    if (objByCpf.length == 1){
      throw new Error ("Já existe um VeiculoEmpresa com esta placa!");
    }
    const obj = await VeiculoEmpresa.create({ placa, cor, modelo, tipoDeVeiculoServico, statusVeiculo });
    return obj;
  }

  static async update(req, res) {
    const { id } = req.params;
    const { placa, cor, modelo, tipoDeVeiculoServico, statusVeiculo } = req.body;
    var obj = await VeiculoEmpresa.findOne({ where: { id: id } });

    Object.assign(obj, { placa, cor, modelo, tipoDeVeiculoServico, statusVeiculo });

    obj = await obj.save();
    return obj;
  }

  static async delete(req, res) {
    const { id } = req.params;

     // Se não estiver associado, permite a exclusão
     var obj = await VeiculoEmpresa.findByPk(id);
     if (!obj) {
       throw new Error("Veículo não encontrado.");
     }

    // Verificar se o veículo está associado a algum serviço
    const servicoAssociado = await Servico.findOne({ where: { veiculo_empresa_id: id } });
    if (servicoAssociado) {
      throw new Error("Não é possível deletar o veículo, pois ele está associado a um serviço.");
    }
    obj = await obj.destroy();
    return obj;
  }

}

export { VeiculoEmpresaService };
