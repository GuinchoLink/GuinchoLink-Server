// Eduardo Almeida
import { Model, DataTypes } from 'sequelize';

class TipoServico extends Model {
  static init(sequelize) {
    super.init({
      valor_hora: { 
        type: DataTypes.DOUBLE, 
        allowNull: false,
        validate: {
          isFloat: { msg: "Valor por hora deve ser um número válido!" },
          min: { args: [0], msg: "Valor por hora deve ser maior ou igual a 0!" }
        }
      },
      nome: { 
        type: DataTypes.STRING, 
        allowNull: false,
        validate: {
          notEmpty: { msg: "Nome deve ser preenchido!" },
          len: { args: [3, 100], msg: "Nome deve ter entre 3 e 100 caracteres!" }
        }
      },
      descricao: { 
        type: DataTypes.STRING, 
        allowNull: true,
        validate: {
          len: { args: [0, 255], msg: "Descrição deve ter no máximo 255 caracteres!" }
        }
      }
    }, { 
      sequelize, 
      modelName: 'tipoServico', 
      tableName: 'tiposServico' 
    });
  }

  static associate(models) {
  }
}

export { TipoServico };