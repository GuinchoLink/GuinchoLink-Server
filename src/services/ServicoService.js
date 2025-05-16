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

    // data da hora de solicitação do serviço
    const serviceDate = data.hora_solicitacao ? new Date(data.hora_solicitacao) : new Date();
    
    // Regra de negócio 1 : Verifica se já existem 5 serviços cadastrados para o mesmo dia(No documento está 10)
    // Usa a data do serviço para contar os serviços daquele dia
    const count = await this.countServices(serviceDate);
    if (count >= 5) {
      throw new Error('Não é possível cadastrar mais de 5 serviços no dia.');
    }    
    
    //Regra de negócio 2 : Verifica se o funcionário já está alocado em outro serviço pendente,
    const funcionario = await Funcionario.findByPk(data.funcionario_id);
    const servicoExistente = await Servico.findOne({
      where: {
        funcionario_id: data.funcionario_id,
        status: 'pendente'
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

  // Método para contar os serviços de uma data específica
  async countServices(serviceDate) {
    // Se não for fornecida uma data, usa a data do serviço que está sendo criado
    // ou como fallback, a data de hoje
    const dateToCheck = serviceDate 
      ? new Date(serviceDate)
      : new Date();
      
    const dateString = dateToCheck.toISOString().split('T')[0]; // Obtém a data no formato YYYY-MM-DD

    // Conta os serviços cadastrados na data especificada
    return await Servico.count({
      where: Sequelize.where(
        Sequelize.fn('DATE', Sequelize.col('hora_solicitacao')), 
        dateString // Compara com a data especificada
      ),
    });
  }

}

export default new ServicoService();
