//EDUARDO RODRIGUES ALMEIDA

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

    // Validação do formato do CNPJ
    const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
    if (!cnpjRegex.test(cnpj)) {
      throw new Error("CNPJ inválido! O formato deve ser XX.XXX.XXX/XXXX-XX.");
    }

    // Verificar se já existe uma empresa com o mesmo CNPJ
    const existingEmpresa = await Empresa.findOne({ where: { cnpj } });
    if (existingEmpresa) {
      throw new Error("Já existe uma empresa cadastrada com este CNPJ.");
    }

    const obj = await Empresa.create({ nome, cnpj, endereco, telefone });
    return obj;
  }

  static async update(req, res) {
    const { id } = req.params;
    const { nome, cnpj, endereco, telefone } = req.body;

    // Validação do formato do CNPJ
    const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
    if (!cnpjRegex.test(cnpj)) {
      throw new Error("CNPJ inválido! O formato deve ser XX.XXX.XXX/XXXX-XX.");
    }

    // Verificar se já existe uma empresa com o mesmo CNPJ (exceto a atual)
    const existingEmpresa = await Empresa.findOne({ where: { cnpj, id: { $ne: id } } });
    if (existingEmpresa) {
      throw new Error("Já existe uma empresa cadastrada com este CNPJ.");
    }

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
