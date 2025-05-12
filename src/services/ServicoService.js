import { Servico } from '../models/Servico.js';
import { Cliente } from '../models/Cliente.js';
import { Funcionario} from '../models/Funcionario.js'
import { TipoServico } from '../models/TipoServico.js';
import { VeiculoCliente } from '../models/VeiculoCliente.js';
import { VeiculoEmpresa } from '../models/VeiculoEmpresa.js';
import { Op, Sequelize } from 'sequelize';

class ServicoService {

  async create(data) {

    await this.verifications(data);

    //Regra de negocio 1 - Não pode ter mais de 10 serviços cadastrados no mesmo dia
    const count = await this.countServices();
    if (count >= 10) {
      throw new Error('Não é possível cadastrar mais de 10 serviços no dia.');
    }

    //Regra de negócio 2 - Não pode cadastrar um serviço se o funcionario ja estiver 
    //alocado em outro serviço com status pendente
    const funcionario = await Funcionario.findByPk(data.funcionario_id);
    const servicoExistente = await Servico.findOne({
      where: {
        funcionario_id: data.funcionario_id,
        status: 'pendente',
        [Op.and]: [
          Sequelize.where(
            Sequelize.fn('DATE', Sequelize.col('createdAt')),
            Sequelize.fn('DATE', new Date())
          )
        ]
      }
    });
    if (servicoExistente) {
      throw new Error(`O funcionário ${funcionario.nome} já está alocado em outro serviço pendente.`);
    }
    
    return await Servico.create(data);
  }

  async verifications(data) {
    const cliente = await Cliente.findByPk(data.clienteId);
    const funcionario = await Funcionario.findByPk(data.funcionario_id);
    const tipoServico = await TipoServico.findByPk(data.tipo_servico_id);
    const veiculo_cliente_id = await VeiculoCliente.findByPk(data.veiculo_cliente_id);
    const veiculo_empresa_id = await VeiculoEmpresa.findByPk(data.veiculo_empresa_id);

    const errors = [];

    if (!cliente) {
      errors.push('Cliente não encontrado!');
    }

    if (!funcionario) {
      errors.push('Funcionário não encontrado!');
    }
    
    if (!tipoServico) {
      errors.push('Tipo de Serviço não encontrado!');
    }

    if (!veiculo_cliente_id) {
      errors.push('Veículo do Cliente não encontrado!');
    }

    if (!veiculo_empresa_id) {
      errors.push('Veículo da Empresa não encontrado!');
    }

  if (errors.length > 0) {
    throw new Error(errors.join(' | ')); 
  }    
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

  // Método para contar os serviços do dia
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

}

export default new ServicoService();
