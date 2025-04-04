//WELINGTON GULINELLI COSTA

import { Administrador } from "../models/Administrador.js";

class AdministradorService {
  
  static async findAll(req, res) {
    const objs = await Administrador.findAll();
    return objs;
  }

  static async findByPk(req, res) {
    const { id } = req.params;
    const obj = await Administrador.findByPk(id);
    return obj;
  }

  static async create(req, res) {
    const { nome, cpf, nascimento , login, senha} = req.body;

    // Regra de negócio: não podem existir dois Administradors com o mesmo cpf
    const objByCpf = await Administrador.findAll({where : {cpf: cpf}});
    if (objByCpf.length == 1){
      throw new Error ("Já existe um Administrador com este CPF");
    }

    const obj = await Administrador.create({ nome, cpf, nascimento, login, senha });
    return obj;
  }

  static async update(req, res) {
    const { id } = req.params;
    const { nome, cpf, nascimento , login, senha } = req.body;
    var obj = await Administrador.findOne({ where: { id: id } });
    Object.assign(obj, { nome, cpf, nascimento , login, senha });
    obj = await obj.save();
    return obj;
  }

  static async delete(req, res) {
    const { id } = req.params;
    var obj = await Administrador.findByPk(id);
    obj = await obj.destroy();
    return obj;
  }

}

export { AdministradorService };
