// Welington Gulinelli
import { Model, DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';

class Administrador extends Model {

  static init(sequelize) {
    super.init({
      nome: { 
        type: DataTypes.STRING, 
        validate: {
          notEmpty: { msg: "Nome do Administrador deve ser preenchido!" },
          len: { args: [2, 50], msg: "Nome do Administrador deve ter entre 2 e 50 letras!" }
        }
      },
      cpf: { 
        type: DataTypes.STRING, 
        validate: {
          notEmpty: { msg: "CPF do Administrador deve ser preenchido!" },
          is: { args: ["[0-9]{3}\\.[0-9]{3}\\.[0-9]{3}\\-[0-9]{2}"], msg: "CPF do Administrador deve seguir o padrão NNN.NNN.NNN-NN!" },
        }
      },
      nascimento: { 
        type: DataTypes.DATEONLY, 
        validate: {
          isDate: { msg: "Nascimento do Administrador deve ser preenchido!" },
          is: { args: ["[0-9]{4}\\-[0-9]{2}\\-[0-9]{2}"], msg: "Nascimento do Administrador deve seguir o padrão yyyy-MM-dd!" }
        }
      },
      login: { 
        type: DataTypes.STRING, 
        validate: {
          notEmpty: { msg: "Login do Administrador deve ser preenchido!" },
        }
      },
      senha: { 
        type: DataTypes.STRING, 
        validate: {
          notEmpty: { msg: "Senha do Administrador deve ser preenchida!" },
          is: { args: ["^(?=.*[0-9]).+$"], msg: "Senha do Administrador deve conter pelo menos um número!" }
        }
      }
    }, { 
      sequelize, 
      modelName: 'administrador', 
      tableName: 'administrador',
      hooks: {
        beforeCreate: async (administrador) => {
          if (administrador.senha) {
            administrador.senha = await bcrypt.hash(administrador.senha, 10);
          }
        },
        beforeUpdate: async (administrador) => {
          if (administrador.changed('senha')) {
            administrador.senha = await bcrypt.hash(administrador.senha, 10);
          }
        }
      }
    });
  }

  static associate(models) {
    // Nenhuma associação direta no momento
  }
}

export { Administrador };