//Eduardo Rodrigues Almeida 
import { FimServico } from '../models/FimServico.js';
import { Servico } from '../models/Servico.js';
import { VeiculoCliente } from '../models/VeiculoCliente.js';
import { Op, Sequelize } from 'sequelize';

class FimServicoService {    // Método para criar um novo registro de finalização de serviço
  async create(data) {
    const errors = [];

    // Validações de campos
    if (!data.descricao_fim || data.descricao_fim.trim() === '') {
      errors.push('A descrição de finalização não pode estar vazia!');
    } else if (data.descricao_fim.length > 50) {
      errors.push('A descrição de finalização deve ter no máximo 50 caracteres!');
    }    if (!data.hora_finalizacao || data.hora_finalizacao.trim() === '') {
      errors.push('A hora da finalização não pode estar vazia!');
    }

    // Corrige a validação do valorTotal (que é um número/double, não uma string)
    if (data.valorTotal === undefined || data.valorTotal === null || isNaN(data.valorTotal) || data.valorTotal <= 0) {
      errors.push('O valor total deve ser um número positivo maior que zero!');
    }
      // Verifica se o serviço existe
    const servico = await Servico.findByPk(data.servico_id, {
      include: [
        { association: 'veiculoEmpresa' }, // Inclui o veículo da empresa associado
        { 
          association: 'veiculoCliente',
          include: [
            { association: 'cliente' } // Inclui o cliente associado ao veículo
          ]
        }
      ]
    });
    
    if (!servico) {
      errors.push('Serviço não encontrado!');
    }

    // Verifica se o serviço já foi finalizado
    const fimServicoExistente = await FimServico.findOne({
      where: { servico_id: data.servico_id }
    });

    if (fimServicoExistente) {
      errors.push('Este serviço já foi finalizado!');
    }
    
    // Se houver erros de validação, lança uma exceção com todos os erros
    if (errors.length > 0) {
      throw new Error(errors.join(' '));
    }
    
    // Verifica se o cliente tem direito a desconto (3 ou mais serviços finalizados no mesmo mês)
    if (servico.veiculoCliente && servico.veiculoCliente.cliente) {
      // Obtém o mês e ano da finalização do serviço (não a data atual do sistema)
      const dataFinalizacao = new Date(data.hora_finalizacao);
      const mesFinalizacao = dataFinalizacao.getMonth();
      const anoFinalizacao = dataFinalizacao.getFullYear();
      
      // Busca o clienteId do veículo do cliente
      const clienteId = servico.veiculoCliente.cliente.id;
      
      // Busca todos os veículos do cliente
      const veiculosDoCliente = await VeiculoCliente.findAll({
        where: { clienteId },
        attributes: ['id']
      });
      
      // Obtém os IDs dos veículos do cliente
      const veiculoIds = veiculosDoCliente.map(veiculo => veiculo.id);
      
      // Busca todos os serviços finalizados do cliente (através de seus veículos)
      const servicosFinalizados = await Servico.findAll({
        where: { 
          veiculo_cliente_id: {
            [Op.in]: veiculoIds
          },
          status: 'finalizado'
        },
        include: [
          { 
            association: 'fimServico',
            attributes: ['hora_finalizacao']
          }
        ]
      });
      
      // Filtra os serviços finalizados no mesmo mês da finalização
      const servicosFinalizadosNoMes = servicosFinalizados.filter(serv => {
        if (serv.fimServico && serv.fimServico.hora_finalizacao) {
          const dataFimServico = new Date(serv.fimServico.hora_finalizacao);
          const mesServico = dataFimServico.getMonth();
          const anoServico = dataFimServico.getFullYear();
          return mesServico === mesFinalizacao && anoServico === anoFinalizacao;
        }
        return false;
      });
      
      // Se o cliente já tiver 3 ou mais serviços finalizados no mesmo mês (sem contar o atual)
      if (servicosFinalizadosNoMes.length >= 3) {
        // Aplica desconto de 10%
        data.valorTotal = data.valorTotal * 0.9; // 90% do valor original
        data.on_sale = true; // Marca como em promoção
      } else {
        // Garante que o campo on_sale seja falso se não tiver direito ao desconto
        data.on_sale = false;
      }
    } else {
      // Garante que o campo on_sale seja falso se não houver cliente associado
      data.on_sale = false;
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
  
  // Método para encontrar registros de finalização de serviço por cliente
  async findByClienteId(clienteId) {
    try {
      // Primeiro, encontre todos os veículos do cliente
      const veiculosDoCliente = await VeiculoCliente.findAll({
        where: { clienteId },
        attributes: ['id']
      });
      
      if (!veiculosDoCliente || veiculosDoCliente.length === 0) {
        throw new Error('Nenhum veículo encontrado para este cliente!');
      }
      
      // Obtenha os IDs dos veículos do cliente
      const veiculoIds = veiculosDoCliente.map(veiculo => veiculo.id);
      
      // Busque todos os serviços relacionados a esses veículos
      const servicos = await Servico.findAll({
        where: {
          veiculo_cliente_id: {
            [Op.in]: veiculoIds
          },
          status: 'finalizado' // Considere apenas serviços finalizados
        },
        attributes: ['id']
      });
      
      if (!servicos || servicos.length === 0) {
        throw new Error('Nenhum serviço encontrado para os veículos deste cliente!');
      }
      
      // Obtenha os IDs dos serviços
      const servicoIds = servicos.map(servico => servico.id);
      
      // Busque os registros de finalização para esses serviços
      const finalizacoes = await FimServico.findAll({
        where: {
          servico_id: {
            [Op.in]: servicoIds
          }
        },
        include: [
          {
            association: 'servico',
            include: [
              { association: 'tipoServico' },
              { 
                association: 'veiculoCliente',
                include: [{ association: 'cliente' }]
              },
              { association: 'veiculoEmpresa' }
            ]
          }
        ],
        order: [['hora_finalizacao', 'DESC']]
      });
      
      if (finalizacoes.length === 0) {
        throw new Error('Nenhum registro de finalização encontrado para este cliente!');
      }
      
      return finalizacoes;
    } catch (error) {
      throw new Error(`Erro ao buscar finalizações de serviço por cliente: ${error.message}`);
    }
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



  // Método para obter estatísticas de finalizações por cliente
  async getClienteStatistics(clienteId = null) {
    try {
      if (clienteId) {
        // Estatísticas para um cliente específico
        const veiculosDoCliente = await VeiculoCliente.findAll({
          where: { clienteId },
          attributes: ['id']
        });
        
        if (!veiculosDoCliente || veiculosDoCliente.length === 0) {
          return {
            clienteId,
            nomeCliente: null,
            quantidade: 0,
            valorTotal: 0,
            finalizacoes: []
          };
        }
        
        const veiculoIds = veiculosDoCliente.map(veiculo => veiculo.id);
        
        const servicos = await Servico.findAll({
          where: {
            veiculo_cliente_id: {
              [Op.in]: veiculoIds
            },
            status: 'finalizado'
          },
          attributes: ['id']
        });
        
        if (!servicos || servicos.length === 0) {
          return {
            clienteId,
            nomeCliente: null,
            quantidade: 0,
            valorTotal: 0,
            finalizacoes: []
          };
        }
        
        const servicoIds = servicos.map(servico => servico.id);
        
        const finalizacoes = await FimServico.findAll({
          where: {
            servico_id: {
              [Op.in]: servicoIds
            }
          },
          include: [
            {
              association: 'servico',
              include: [
                { association: 'tipoServico' },
                { 
                  association: 'veiculoCliente',
                  include: [{ association: 'cliente' }]
                }
              ]
            }
          ],
          order: [['hora_finalizacao', 'DESC']]
        });
        
        const valorTotal = finalizacoes.reduce((total, fim) => total + (fim.valorTotal || 0), 0);
        const nomeCliente = finalizacoes.length > 0 && finalizacoes[0].servico?.veiculoCliente?.cliente?.nome || null;
        
        return {
          clienteId,
          nomeCliente,
          quantidade: finalizacoes.length,
          valorTotal,
          finalizacoes
        };      } else {
        // Estatísticas gerais de todos os serviços finalizados
        const todasFinalizacoes = await FimServico.findAll({
          include: [
            {
              association: 'servico',
              include: [
                { association: 'tipoServico' },
                { 
                  association: 'veiculoCliente',
                  include: [{ association: 'cliente' }]
                }
              ]
            }
          ],
          order: [['hora_finalizacao', 'DESC']]
        });
        
        if (!todasFinalizacoes || todasFinalizacoes.length === 0) {
          return {
            quantidade: 0,
            valorTotal: 0,
            finalizacoes: []
          };
        }
        
        // Calcula a quantidade total e valor total de todos os serviços finalizados
        const quantidade = todasFinalizacoes.length;
        const valorTotal = todasFinalizacoes.reduce((total, fim) => total + (fim.valorTotal || 0), 0);
        
        return {
          quantidade,
          valorTotal,
          finalizacoes: todasFinalizacoes
        };
      }
    } catch (error) {
      throw new Error(`Erro ao buscar estatísticas de clientes: ${error.message}`);
    }
  }
}

export default new FimServicoService();
