import { Empresa } from "../models/Empresa.js";

class EmpresaService {
  
  static async findAll(req, res) {
    const objs = await Empresa.findAll();
    return objs;
  }

  static async findByPk(req, res) {
    const { id } = req.params;
    const obj = await Empresa.findByPk(id);
    return obj;
  }

  static async create(req, res) {
    const { nome, cnpj, endereco, telefone } = req.body;


    // Regra de negócio: não podem existir dois Empresas com o mesmo cnpj
    //const objByCpf = await Empresa.findAll({where : {cnpj: cnpj}});
    //if (objByCpf.length == 1){
      //throw new Error ("Já existe um Empresa com este CNPJ");
    //}


    const obj = await Empresa.create({ nome, cnpj, endereco, telefone });
    return obj;
  }

  static async update(req, res) {
    const { id } = req.params;
    const { nome, cnpj, endereco, telefone } = req.body;
    var obj = await Empresa.findOne({ where: { id: id } });
    Object.assign(obj, { nome, cnpj, endereco, telefone });
    obj = await obj.save();
    return obj;
  }

  static async delete(req, res) {
    const { id } = req.params;
    var obj = await Empresa.findByPk(id);
    obj = await obj.destroy();
    return obj;
  }

}

export { EmpresaService };
