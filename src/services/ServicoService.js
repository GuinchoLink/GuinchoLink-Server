import { Servico } from "../models/Servico.js";
import { Cliente } from "../models/Cliente.js";
import { Funcionario } from "../models/Funcionario.js";
import { TipoServico } from "../models/TipoServico.js";
import { VeiculoCliente } from "../models/VeiculoCliente.js";
import { VeiculoEmpresa } from "../models/VeiculoEmpresa.js";
import { Op, Sequelize, QueryTypes } from "sequelize";
import sequelize from "../config/database.js"; // Importação do banco de dados

class ServicoService {
  async create(data) {
    const transaction = await sequelize.transaction();

    try {
      await this.verifications(data, transaction);

      const serviceDate = data.hora_solicitacao
        ? new Date(data.hora_solicitacao)
        : new Date();

      // Regra de negócio 1 : Verifica se já existem 3 serviços cadastrados para o mesmo dia
      const count = await this.countServices(serviceDate, transaction);
      if (count >= 3) {
        throw new Error("Não é possível cadastrar mais de 3 serviços no dia.");
      }

      // Regra de negócio 2 : Verifica se o funcionário já está alocado em outro serviço pendente
      const funcionario = await Funcionario.findByPk(data.funcionario_id, {
        transaction,
      });
      const servicoExistente = await Servico.findOne({
        where: {
          funcionario_id: data.funcionario_id,
          status: "pendente",
        },
        transaction,
      });

      if (servicoExistente) {
        throw new Error(
          `O funcionário ${funcionario.nome} já está alocado em outro serviço pendente.`
        );
      }

      const novoServico = await Servico.create(data, { transaction });

      await VeiculoEmpresa.update(
        { status_veiculo: "emUso" },
        {
          where: { id: data.veiculo_empresa_id },
          transaction,
        }
      );
      await transaction.commit();

      return novoServico;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async verifications(data, transaction) {
    const cliente = await Cliente.findByPk(data.clienteId, { transaction });
    const funcionario = await Funcionario.findByPk(data.funcionario_id, {
      transaction,
    });
    const tipoServico = await TipoServico.findByPk(data.tipo_servico_id, {
      transaction,
    });
    const veiculo_cliente_id = await VeiculoCliente.findByPk(
      data.veiculo_cliente_id,
      { transaction }
    );
    const veiculo_empresa = await VeiculoEmpresa.findByPk(
      data.veiculo_empresa_id,
      { transaction }
    );

    const errors = [];

    if (!cliente) {
      errors.push("Cliente não encontrado!");
    }

    if (!funcionario) {
      errors.push("Funcionário não encontrado!");
    }

    if (!tipoServico) {
      errors.push("Tipo de Serviço não encontrado!");
    }

    if (!veiculo_cliente_id) {
      errors.push("Veículo do Cliente não encontrado!");
    }

    if (!veiculo_empresa) {
      errors.push("Veículo da Empresa não encontrado!");
    } else if (veiculo_empresa.status_veiculo !== "livre") {
      errors.push("Veículo da Empresa não está livre para uso!");
    }

    if (errors.length > 0) {
      throw new Error(errors.join(" | "));
    }
  }

  // Atualizar o método countServices para aceitar transação
  async countServices(serviceDate, transaction) {
    const dateToCheck = serviceDate ? new Date(serviceDate) : new Date();
    const dateString = dateToCheck.toISOString().split("T")[0]; // Obtém a data no formato YYYY-MM-DD

    return await Servico.count({
      where: Sequelize.where(
        Sequelize.fn("DATE", Sequelize.col("hora_solicitacao")),
        dateString
      ),
      transaction,
    });
  }

  async findAll() {
    return await Servico.findAll({
      include: [
        {
          association: "veiculoCliente",
          include: [{ association: "cliente", attributes: ["nome"] }],
        },
        {
          association: "funcionario",
          attributes: ["nome"],
        },
        {
          association: "tipo_servico",
          attributes: ["nome"],
        },
      ],
    });
  }

  async findById(id) {
    const servico = await Servico.findByPk(id);
    if (!servico) {
      throw new Error("Serviço não encontrado!");
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

  /**
   * Método para gerar relatório de serviços por cliente específico
   * @param {Object} req - Objeto de requisição contendo o ID do cliente
   * @returns {Array} Lista de serviços do cliente
   */
  async findByCliente(req) {
    const { clienteId } = req.params;

    const servicos = await sequelize.query(
      "SELECT s.id, s.hora_solicitacao, s.descricao, s.status, s.localizacao, " +
        "ts.nome as tipos_servico, f.nome as funcionarios, vc.placa as veiculos_clientes, " +
        "ve.placa as veiculo_empresa " +
        "FROM servicos s " +
        "LEFT JOIN tipos_servico ts ON s.tipo_servico_id = ts.id " +
        "LEFT JOIN funcionarios f ON s.funcionario_id = f.id " +
        "LEFT JOIN veiculos_clientes vc ON s.veiculo_cliente_id = vc.id " +
        "LEFT JOIN veiculos_da_empresa ve ON s.veiculo_empresa_id = ve.id " +
        "WHERE s.cliente_id = :clienteId " +
        "ORDER BY s.hora_solicitacao DESC",
      {
        replacements: { clienteId },
        type: QueryTypes.SELECT,
      }
    );

    return servicos;
  }

  /**
   * Método para gerar relatório de serviços por status específico
   * @param {Object} req - Objeto de requisição contendo o status
   * @returns {Array} Lista de serviços com o status especificado
   */
  async findByStatus(req) {
    const { status } = req.params;

    // Validar se o status é válido
    const statusValidos = ["andamento", "pendente", "finalizado", "cancelado"];
    if (!statusValidos.includes(status)) {
      throw new Error(
        `Status inválido. Status deve ser um dos seguintes: ${statusValidos.join(
          ", "
        )}`
      );
    }

    const servicos = await sequelize.query(
      "SELECT s.id, s.hora_solicitacao, s.descricao, s.status, s.localizacao, " +
        "ts.nome as tipos_servico, f.nome as funcionarios, vc.placa as veiculos_clientes, " +
        "ve.placa as veiculo_empresa, c.nome as cliente " +
        "FROM servicos s " +
        "LEFT JOIN tipos_servico ts ON s.tipo_servico_id = ts.id " +
        "LEFT JOIN funcionarios f ON s.funcionario_id = f.id " +
        "LEFT JOIN veiculos_clientes vc ON s.veiculo_cliente_id = vc.id " +
        "LEFT JOIN veiculos_da_empresa ve ON s.veiculo_empresa_id = ve.id " +
        "LEFT JOIN clientes c ON s.cliente_id = c.id " +
        "WHERE s.status = :status " +
        "ORDER BY s.hora_solicitacao DESC",
      {
        replacements: { status },
        type: QueryTypes.SELECT,
      }
    );

    return servicos;
  }
}

export default new ServicoService();
