// Leandro Carvalho
import { Model, DataTypes } from 'sequelize';

class Cliente extends Model {
  static init(sequelize) {
    super.init({
      nome: { 
        type: DataTypes.STRING, 
        validate: {
          notEmpty: { msg: "Nome do Cliente deve ser preenchido!" },
          len: { args: [2, 50], msg: "Nome do Cliente deve ter entre 2 e 50 letras!" }
        }
      },
      cpf: { 
        type: DataTypes.STRING, 
        validate: {
          notEmpty: { msg: "CPF do Cliente deve ser preenchido!" },
          is: { args: ["[0-9]{3}\\.[0-9]{3}\\.[0-9]{3}\\-[0-9]{2}"], msg: "CPF do Cliente deve seguir o padrão NNN.NNN.NNN-NN!" },
        }
      },
      nascimento: { 
        type: DataTypes.DATEONLY, 
        validate: {
          isDate: { msg: "Nascimento do Cliente deve ser preenchido!" },
          is: { args: ["[0-9]{4}\\-[0-9]{2}\\-[0-9]{2}"], msg: "Nascimento do Cliente deve seguir o padrão yyyy-MM-dd!" }
        }
      },
      telefone: { 
        type: DataTypes.STRING, 
        validate: {
          notEmpty: { msg: "Número do Cliente deve ser preenchido!" },
        }
      },
      endereco: { 
        type: DataTypes.STRING, 
        validate: {
          notEmpty: { msg: "Endereço do Cliente deve ser preenchido!" },
        }
      }
    }, { sequelize, modelName: 'cliente', tableName: 'clientes' });
  }

  static associate(models) {
    // Associação 1:N com VeiculoCliente
    this.hasMany(models.veiculoCliente, { foreignKey: 'clienteId', as: 'veiculos' });

    // Associação 1:N com Servico
    this.hasMany(models.servico, { foreignKey: 'clienteId', as: 'servicos' });
  }
}

export { Cliente };