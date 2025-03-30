import Sequelize from 'sequelize';
import {Cliente} from '../models/Cliente.js';
import {Empresa} from '../models/Empresa.js';
import {VeiculoCliente} from '../models/VeiculoCliente.js';
import {VeiculoEmpresa} from '../models/VeiculoEmpresa.js';


const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite'
});

Cliente.init(sequelize);
VeiculoCliente.init(sequelize);
VeiculoEmpresa.init(sequelize);
Empresa.init(sequelize);

(async () => {
    await sequelize.sync({ force: true });

    await Cliente.create({nome: "Alberto", cpf: "111.111.111-11", nascimento: "2001-01-01"});
    await Cliente.create({nome: "Bernardo", cpf: "222.222.222-22", nascimento: "2002-02-02"});

    await VeiculoCliente.create({placa: "ABC1156", cor: "Azul", modelo: "Fusca", tipoDeVeiculo: "van"});
    await VeiculoCliente.create({placa: "BHG2222", cor: "Vermelho", modelo: "Gol", tipoDeVeiculo: "carro"});
    await VeiculoCliente.create({placa: "CIU3333", cor: "Verde", modelo: "F4000", tipoDeVeiculo: "caminhao"});
    await VeiculoCliente.create({placa: "SGA7G15", cor: "Prata", modelo: "Onix", tipoDeVeiculo: "carro"});
    await VeiculoCliente.create({placa: "EEE5555", cor: "Amarelo", modelo: "Mazerati", tipoDeVeiculo: "carro"});

    await VeiculoEmpresa.create({placa: "DDD9098", cor: "Preto", modelo: "CG 150", tipoDeVeiculoServico: "moto", statusVeiculo: "livre"});
    await VeiculoEmpresa.create({placa: "EEE9411", cor: "Azul", modelo: "F5000", tipoDeVeiculoServico: "caminhaoPrancha", statusVeiculo: "livre"});
    await VeiculoEmpresa.create({placa: "LPU6A87", cor: "Vermelho", modelo: "Gol", tipoDeVeiculoServico: "carro", statusVeiculo: "livre"});
    await VeiculoEmpresa.create({placa: "LPO7H28", cor: "Verde", modelo: "F4000", tipoDeVeiculoServico: "caminhaoLanca", statusVeiculo: "livre"});
    await VeiculoEmpresa.create({placa: "JHP2178", cor: "Preto", modelo: "CG 150", tipoDeVeiculoServico: "moto", statusVeiculo: "livre"});

    await Empresa.create({nome: "GuinchoLink", cnpj: "11.125.825/0001-22", endereco: "Rua Luis Pena, 30. Castelo", telefone: "00 94002-8922"});
})();

export default sequelize;