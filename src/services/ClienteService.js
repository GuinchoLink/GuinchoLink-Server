//LEANDRO CARVALHO FRAGA

import { Cliente } from "../models/Cliente.js";
import { VeiculoCliente } from "../models/VeiculoCliente.js";

class ClienteService {
  
  static async findAll(req, res) {
    const objs = await Cliente.findAll();
    return objs;
  }

  static async findByPk(req, res) {
    const { id } = req.params;
    const obj = await Cliente.findByPk(id);
    return obj;
  }

  static async create(req, res) {
    const { nome, cpf, nascimento, telefone, endereco } = req.body;

    // Regra de negócio: não podem existir dois clientes com o mesmo cpf
    const objByCpf = await Cliente.findAll({where : {cpf: cpf}});
    if (objByCpf.length == 1){
      throw new Error ("Já existe um cliente com este CPF");
    }

    const obj = await Cliente.create({ nome, cpf, nascimento, telefone, endereco });
    return obj;
  }

  static async update(req, res) {
    const { id } = req.params;
    const { nome, cpf, nascimento, telefone, endereco } = req.body;
    var obj = await Cliente.findOne({ where: { id: id } });
    
    Object.assign(obj, { nome, cpf, nascimento, telefone, endereco });
    obj = await obj.save();
    return obj;
  }

  static async delete(req, res) {
    const { id } = req.params;
    var obj = await Cliente.findByPk(id);
    if (!obj) throw new Error ('Cliente não encontrado!');
    const veiculoAssociado = await VeiculoCliente.findOne({ where: { clienteId: id } });
    if (veiculoAssociado) throw new Error ('Não é possível excluir o cliente, pois ele possui veículos associados!');
    obj = await obj.destroy();
    return obj;
  }

}

export { ClienteService };
