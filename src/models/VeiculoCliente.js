// Leandro Carvalho
import { Model, DataTypes } from 'sequelize';

class VeiculoCliente extends Model {

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
          len: {args: [2, 20], msg: "A cor deve ter entre 2 e 20 caracteres!" }
        }
      },
      modelo: { 
        type: DataTypes.STRING, 
        validate: {
          notEmpty: { msg: "Modelo do veiculo" },
          len: {args: [2, 20], msg: "O modelo deve ter entre 2 e 20 caracteres!" }
        }
      },
      tipoDeVeiculo: { 
        type: DataTypes.ENUM ("moto", "carro", "caminhao", "pickup", "carreta", "trator", "onibus", "van", "outro"), 
        validate: {
            isIn:{
                args: [["moto", "carro", "caminhao", "pickup", "carreta", "trator", "onibus", "van", "outro"]],
                msg: "Tipo de veiculo invalido"
            }
        }
      },
    }, { 
      sequelize, 
      underscored: true, 
      modelName: 'veiculo_cliente', 
      tableName: 'veiculos_clientes' 
    })
  }

  static associate(models) {
    this.belongsTo(models.cliente, { foreignKey: 'cliente_id', as: 'cliente' });
  }
  
}

export { VeiculoCliente };