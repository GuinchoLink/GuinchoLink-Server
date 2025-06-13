import { Model, DataTypes } from 'sequelize';

class Servico extends Model {
  static init(sequelize) {
    super.init({
      hora_solicitacao: { 
        type: DataTypes.DATE, 
        allowNull: false,
        validate: {
          notEmpty: { msg: "Hora da solicitação deve ser preenchida!" },
          isDate: { msg: "Hora da solicitação deve ser uma data válida!" }
        }
      },
      descricao: { 
        type: DataTypes.STRING, 
        allowNull: false,
        validate: {
          notEmpty: { msg: "Descrição deve ser preenchida!" },
          len: { args: [5, 255], msg: "Descrição deve ter entre 5 e 255 caracteres!" }
        }
      },
      status: { 
        type: DataTypes.ENUM('andamento', 'pendente', 'finalizado', 'cancelado'),
        allowNull: false,
        validate: {
          notEmpty: { msg: "Status deve ser preenchido!" },
          isIn: { 
            args: [['andamento', 'pendente', 'finalizado', 'cancelado']], 
            msg: "Status deve ser 'andamento', 'pendente', 'finalizado' ou 'cancelado'!" 
          }
        }
      },
      localizacao: { 
        type: DataTypes.STRING, 
        allowNull: false,
        validate: {
          notEmpty: { msg: "Localização deve ser preenchida!" },
          len: { args: [5, 255], msg: "Localização deve ter entre 5 e 255 caracteres!" }
        }
      },
    }, { 
      sequelize, 
      modelName: 'servico', 
      tableName: 'servicos' 
    });
  }
  static associate(models) {
    this.belongsTo(models.cliente, { foreignKey: 'cliente_id', as: 'cliente' });
    this.belongsTo(models.tipo_servico, { foreignKey: 'tipo_servico_id', as: 'tipo_servico' });
    this.belongsTo(models.funcionario, { foreignKey: 'funcionario_id', as: 'funcionario' }); // Associação com Funcionario
    this.belongsTo(models.veiculoCliente, { foreignKey: 'veiculo_cliente_id', as: 'veiculoCliente' }); // Associação com VeiculoCliente
    this.belongsTo(models.veiculo_empresa, { foreignKey: 'veiculo_empresa_id', as: 'veiculo_empresa' }); // Associação com VeiculoEmpresa
    this.hasOne(models.fim_servico, { foreignKey: 'servico_id', as: 'fimServico' }); // Associação com FimServico
  }
}

export { Servico };