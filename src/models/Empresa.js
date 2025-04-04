// Eduardo Almeida
import { Model, DataTypes } from 'sequelize';

class Empresa extends Model {

  static init(sequelize) {
    super.init({
      nome: { 
        type: DataTypes.STRING, 
        validate: {
          notEmpty: { msg: "Nome da Empresa deve ser preenchido!" },
          len: { args: [2, 50], msg: "Nome da empresa deve ter entre 2 e 50 letras!" }
        }
      },
      cnpj: { 
        type: DataTypes.STRING, 
        validate: {
          notEmpty: { msg: "CNPJ da Empresa deve ser preenchido!" },
          is: {args: ["[0-9]{2}\.[0-9]{3}\.[0-9]{3}\/[0-9]{4}\-[0-9]{2}"], msg: "CNPJ da Empresa deve seguir o padrão NN.NNN.NNN/NNNN-NN!" },
        }
      },
      endereco: { 
        type: DataTypes.STRING, 
        validate: {
          notEmpty: { msg: "Digite o endereco da empresa!" },
          len: {args: [2,50], msg: "O endereco deve conter de 2 ate 50 caracteres" }
        }
      },
      telefone: { 
        type: DataTypes.STRING, 
        validate: {
          notEmpty: { msg: "Digite o telefone da empresa!" },
          is: {args: ["[0-9]{2} [0-9]{5}\-[0-9]{4}"], msg: "O telefone deve conter o seguinte formato xx xxxxx-xxxx" }
        }
      }
    }, { sequelize, modelName: 'empresa', tableName: 'empresas' })
  }

  static associate(models) {
  }

}

export { Empresa };