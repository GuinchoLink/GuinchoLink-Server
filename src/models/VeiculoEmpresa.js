// Eduardo Almeida
import { Model, DataTypes } from 'sequelize';

class VeiculoEmpresa extends Model {

  static init(sequelize) {
    super.init({
      placa: { 
        type: DataTypes.STRING, 
        validate: {
          notEmpty: { msg: "Placa do Veiculo" },
          len: { args: [7], msg: "Placa deve ter sete letras!" }
        }
      },
      cor: { 
        type: DataTypes.STRING, 
        validate: {
          notEmpty: { msg: "Cor do veiculo" },
          len: {args: [2, 20], msg: "A cor deve ter entre 2 e 20 caracteres!" },
        }
      },
      modelo: { 
        type: DataTypes.STRING, 
        validate: {
          notEmpty: { msg: "Modelo do veiculo" },
          len: {args: [2, 20], msg: "O modelo deve ter entre 2 e 20 caracteres!" },
        }
      },
      tipoDeVeiculoServico: { 
        type: DataTypes.ENUM ("moto", "pickup", "caminhaoPrancha","carro", "caminhaoLanca"), 
        validate: {
            isIn:{
                args: [["moto", "pickup", "caminhaoPrancha", "caminhaoLanca", "carro"]],
                msg: "Tipo de veiculo invalido"
            }
        }
      },
      statusVeiculo: { 
        type: DataTypes.ENUM ("livre", "emUso", "manutencao"), 
        validate: {
            isIn:{
                args: [["livre", "emUso", "manutencao"]],
                msg: "Tipo de status invalido"
            }
        }
      }
    }, { sequelize, modelName: 'veiculoEmpresa', tableName: 'veiculosDaEmpresa' })
  }

  static associate(models) {
  }
  
}

export { VeiculoEmpresa };