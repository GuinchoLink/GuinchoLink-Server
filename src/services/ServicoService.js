import { Servico } from '../models/Servico.js';
import { Op, Sequelize } from 'sequelize';

class ServicoService {
  // Método para contar os serviços cadastrados no dia
  async countServices() {
    const today = new Date();
    const todayString = today.toISOString().split('T')[0]; // Obtém a data no formato YYYY-MM-DD

    // Conta os serviços cadastrados no dia
    return await Servico.count({
      where: Sequelize.where(
        Sequelize.fn('DATE', Sequelize.col('createdAt')), // Extrai apenas a data de createdAt
        todayString // Compara com a data de hoje
      ),
    });
  }

  // Método para criar um novo serviço
  async create(data) {
    // Verifica a quantidade de serviços cadastrados no dia usando countServices
    const count = await this.countServices();

    if (count >= 10) {
      throw new Error('Não é possível cadastrar mais de 10 serviços no dia.');
    }

    // Cria o serviço
    return await Servico.create(data);
  }

  async findAll() {
    return await Servico.findAll();
  }

  async findById(id) {
    const servico = await Servico.findByPk(id);
    if (!servico) {
      throw new Error('Serviço não encontrado!');
    }
    return servico;
  }

  async update(id, data) {
    const servico = await this.findById(id);
    return await servico.update(data);
  }

  async delete(id) {
    const servico = await this.findById(id);
    return await servico.destroy();
  }
}

export default new ServicoService();
