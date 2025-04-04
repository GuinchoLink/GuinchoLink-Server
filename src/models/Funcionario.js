import { Model, DataTypes } from 'sequelize';

class Funcionario extends Model {

  static init(sequelize) {
    super.init({
      nome: { 
        type: DataTypes.STRING, 
        validate: {
          notEmpty: { msg: "Nome do Funcionario deve ser preenchido!" },
          len: { args: [2, 50], msg: "Nome do Funcionario deve ter entre 2 e 50 letras!" }
        }
      },
      cpf: { 
        type: DataTypes.STRING, 
        validate: {
          notEmpty: { msg: "CPF do Funcionario deve ser preenchido!" },
          is: {args: ["[0-9]{3}\\.[0-9]{3}\\.[0-9]{3}\\-[0-9]{2}"], msg: "CPF do Funcionario deve seguir o padrão NNN.NNN.NNN-NN!" },
        }
      },
      nascimento: { 
        type: DataTypes.DATEONLY, 
        validate: {
          isDate: { msg: "Nascimento do Funcionario deve ser preenchido!" },
          is: {args: ["[0-9]{4}\\-[0-9]{2}\\-[0-9]{2}"], msg: "Nascimento do Funcionario deve seguir o padrão yyyy-MM-dd!" }
        }
      },
      telefone: { 
        type: DataTypes.STRING, 
        validate: {
          notEmpty: { msg: "Numero do Funcionario deve ser preenchido!" },
        }
      },
      endereco: { 
        type: DataTypes.STRING, 
        validate: {
          notEmpty: { msg: "Endereço do Funcionario deve ser preenchido!" },
        }
      },
      cnh: { 
        type: DataTypes.STRING, 
        validate: {
          notEmpty: { msg: "Cnh do Funcionario deve ser preenchido!" },
        }
      },
      categoria_cnh: { 
        type: DataTypes.STRING, 
        validate: {
          notEmpty: { msg: "Categoria de CNH do Funcionario deve ser preenchido!" },
        }
      }
    }, { sequelize, modelName: 'funcionario', tableName: 'funcionarios' });
  }

  static associate(models) {
    // Associação 1:N com Servico
    this.hasMany(models.servico, { foreignKey: 'funcionarioId', as: 'servicos' });
  }
}

export { Funcionario };