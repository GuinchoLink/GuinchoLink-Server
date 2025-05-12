import { FimServico } from '../models/FimServico.js';
import { Servico } from '../models/Servico.js';
import { Op, Sequelize } from 'sequelize';

class FimServicoService {  // Método para criar um novo registro de finalização de serviço
  async create(data) {
    // Verifica se o serviço existe
    const servico = await Servico.findByPk(data.servico_id, {
      include: [
        { association: 'veiculoEmpresa' } // Inclui o veículo da empresa associado
      ]
    });
    
    if (!servico) {
      throw new Error('Serviço não encontrado!');
    }

    // Verifica se o serviço já foi finalizado
    const fimServicoExistente = await FimServico.findOne({
      where: { servico_id: data.servico_id }
    });

    if (fimServicoExistente) {
      throw new Error('Este serviço já foi finalizado!');
    }

    // Atualiza o status do serviço para "finalizado"
    await servico.update({ status: 'finalizado' });

    // Verifica se existe um veículo da empresa associado e atualiza seu status para "livre"
    if (servico.veiculoEmpresa) {
      await servico.veiculoEmpresa.update({ statusVeiculo: 'livre' });
    }

    // Cria o registro de finalização de serviço
    return await FimServico.create(data);
  }

  // Método para encontrar todos os registros de finalização de serviço
  async findAll() {
    return await FimServico.findAll({
      include: [
        { association: 'servico' }
      ]
    });
  }

  // Método para encontrar um registro de finalização de serviço por ID
  async findById(id) {
    const fimServico = await FimServico.findByPk(id, {
      include: [
        { association: 'servico' }
      ]
    });
    
    if (!fimServico) {
      throw new Error('Registro de finalização de serviço não encontrado!');
    }
    
    return fimServico;
  }

  // Método para encontrar um registro de finalização de serviço pelo ID do serviço
  async findByServicoId(servicoId) {
    const fimServico = await FimServico.findOne({
      where: { servico_id: servicoId },
      include: [
        { association: 'servico' }
      ]
    });
    
    if (!fimServico) {
      throw new Error('Registro de finalização para este serviço não encontrado!');
    }
    
    return fimServico;
  }

  // Método para atualizar um registro de finalização de serviço
  async update(id, data) {
    const fimServico = await this.findById(id);
    return await fimServico.update(data);
  }

  // Método para excluir um registro de finalização de serviço
  async delete(id) {
    const fimServico = await this.findById(id);
    return await fimServico.destroy();
  }

  // Método para obter estatísticas de finalizações de serviço
  async getStatistics() {    // Total de serviços finalizados
    const totalFinalizados = await FimServico.count();
    
    // Valor total de todos os serviços finalizados
    const valorTotal = await FimServico.sum('valorTotal');
    
    // Média de valor por serviço
    const mediaValor = valorTotal / (totalFinalizados || 1);
    
    // Serviços finalizados hoje
    const today = new Date();
    const todayString = today.toISOString().split('T')[0];
    
    const finalizadosHoje = await FimServico.count({
      where: Sequelize.where(
        Sequelize.fn('DATE', Sequelize.col('hora_finalizacao')),
        todayString
      ),
    });
    
    return {
      totalFinalizados,
      valorTotal,
      mediaValor,
      finalizadosHoje
    };
  }
}

export default new FimServicoService();
