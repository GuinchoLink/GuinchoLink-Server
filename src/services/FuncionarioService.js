import { Funcionario } from "../models/Funcionario.js";

class FuncionarioService {
  
  static async findAll(req, res) {
    const objs = await Funcionario.findAll();
    return objs;
  }

  static async findByPk(req, res) {
    const { id } = req.params;
    const obj = await Funcionario.findByPk(id);
    return obj;
  }

  static async create(req, res) {
    const { nome, cpf, nascimento } = req.body;

    // Regra de negócio: não podem existir dois Funcionarios com o mesmo cpf
    const objByCpf = await Funcionario.findAll({where : {cpf: cpf}});
    if (objByCpf.length == 1){
      throw new Error ("Já existe um Funcionario com este CPF");
    }

    const obj = await Funcionario.create({ nome, cpf, nascimento });
    return obj;
  }

  static async update(req, res) {
    const { id } = req.params;
    const { nome, cpf, nascimento } = req.body;
    var obj = await Funcionario.findOne({ where: { id: id } });
    Object.assign(obj, { nome, cpf, nascimento });
    obj = await obj.save();
    return obj;
  }

  static async delete(req, res) {
    const { id } = req.params;
    var obj = await Funcionario.findByPk(id);
    obj = await obj.destroy();
    return obj;
  }

}

export { FuncionarioService };
