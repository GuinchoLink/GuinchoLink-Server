import { Model, DataTypes } from 'sequelize';

class FimServico extends Model {
  static init(sequelize) {
    super.init({
      hora_finalizacao: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Hora de finalização deve ser preenchida!" },
          isDate: { msg: "Hora de finalização deve ser uma data válida!" }
        }
      },
      descricao_fim: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: { args: [0, 255], msg: "Descrição do fim deve ter no máximo 255 caracteres!" }
        }
      },
      valorTotal: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate: {
          isFloat: { msg: "Valor total deve ser um número válido!" },
          min: { args: [0], msg: "Valor total deve ser maior ou igual a 0!" }
        }
      }
    }, {
      sequelize,
      modelName: 'fim_servico',
      tableName: 'fim_servicos'
    });
  }

  static associate(models) {
    // Change this line to use the correct model name as defined in the Servico.js file
    this.belongsTo(models.servico, { foreignKey: 'servico_id', as: 'servico' });
  }
}

export { FimServico };