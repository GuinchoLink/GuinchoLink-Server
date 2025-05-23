import { Servico } from "../models/Servico.js";
import { Cliente } from "../models/Cliente.js";
import { Funcionario } from "../models/Funcionario.js";
import { TipoServico } from "../models/TipoServico.js";
import { VeiculoCliente } from "../models/VeiculoCliente.js";
import { VeiculoEmpresa } from "../models/VeiculoEmpresa.js";
import { Op, Sequelize } from "sequelize";
import sequelize from "../config/database.js"; // Ajuste o caminho conforme a estrutura do seu projeto

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
        { statusVeiculo: "emUso" },
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
    } else if (veiculo_empresa.statusVeiculo !== "livre") {
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
    return await Servico.findAll();
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
}

export default new ServicoService();
