//WELINGTON GULINELLI COSTA

import { Administrador } from "../models/Administrador.js";
import bcrypt from 'bcryptjs';

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
    const { nome, cpf, nascimento, login, senha } = req.body;

    // Regra de negócio: não podem existir dois Administradors com o mesmo cpf
    const objByCpf = await Administrador.findAll({ where: { cpf: cpf } });
    if (objByCpf.length == 1) {
      throw new Error("Já existe um Administrador com este CPF");
    } 

    const obj = await Administrador.create({
      nome,
      cpf,
      nascimento,
      login,
      senha,
    });
    return obj;
  }

  static async update(req, res) {
    const { id } = req.params;
    const { nome, cpf, nascimento, login, senha } = req.body;

    // Buscar o admin existente
    const admin = await Administrador.findByPk(id);
    if (!admin) {
      throw new Error('Admin não encontrado');
    }

    // Preparar dados para atualização
    const updateData = { nome, cpf, nascimento, login };

    // Só incluir senha se ela foi fornecida
    if (senha && senha.trim() !== '') {
      updateData.senha = await bcrypt.hash(senha, 10);
    }

    // Atualizar admin
    await admin.update(updateData);

    // Retornar admin atualizado sem a senha
    const { senha: _, ...adminData } = admin.toJSON();
    
    return {
      message: 'Admin atualizado com sucesso',
      admin: adminData
    };
  }

  static async delete(req, res) {
    const { id } = req.params;
    var obj = await Administrador.findByPk(id);
    obj = await obj.destroy();
    return obj;
  }
}

export { AdministradorService };
