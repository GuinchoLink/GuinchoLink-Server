import { Model, DataTypes } from 'sequelize';

class Feedback extends Model {
  static init(sequelize) {
    super.init({
      nota: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Nota deve ser preenchida!" },
          isInt: { msg: "Nota deve ser um número inteiro!" },
          min: { args: [1], msg: "Nota deve ser no mínimo 1!" },
          max: { args: [5], msg: "Nota deve ser no máximo 5!" }
        }
      },
      comentario: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: { args: [0, 255], msg: "Comentário deve ter no máximo 255 caracteres!" }
        }
      }
    }, {
      sequelize,
      modelName: 'feedback',
      tableName: 'feedbacks'
    });
  }

  static associate(models) {
    this.belongsTo(models.servico, { foreignKey: 'servico_id', as: 'servico' });
  }
}

export { Feedback };