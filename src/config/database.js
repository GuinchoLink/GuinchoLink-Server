import Sequelize from 'sequelize';
import {Cliente} from '../models/Cliente.js';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite'
});

Cliente.init(sequelize);

(async () => {
    await sequelize.sync({ force: true });
    await Cliente.create({nome: "Alberto", cpf: "111.111.111-11", nascimento: "2001-01-01"});
    await Cliente.create({nome: "Bernardo", cpf: "222.222.222-22", nascimento: "2002-02-02"});

    await VeciculoCliente.create({placa: "AAA1111", cor: "Azul", modelo: "Fusca", tipoDeVeiculo: "carro"});
    await VeciculoCliente.create({placa: "BBB2222", cor: "Vermelho", modelo: "Gol", tipoDeVeiculo: "carro"});
    await VeciculoCliente.create({placa: "CCC3333", cor: "Verde", modelo: "F4000", tipoDeVeiculo: "caminhao"});
    await VeciculoCliente.create({placa: "DDD4444", cor: "Preto", modelo: "CG 150", tipoDeVeiculo: "moto"});
    await VeciculoCliente.create({placa: "EEE5555", cor: "Amarelo", modelo: "Mazerati", tipoDeVeiculo: "carro"});

    await VeiculoEmpresa.create({placa: "DDD9098", cor: "Preto", modelo: "CG 150", tipoDeVeiculoServico: "moto", statusVeiculo: "livre"});
    await VeiculoEmpresa.create({placa: "EEE9411", cor: "Azul", modelo: "F5000", tipoDeVeiculoServico: "caminhaoPrancha", statusVeiculo: "livre"});
    await VeiculoEmpresa.create({placa: "FFF6666", cor: "Vermelho", modelo: "Gol", tipoDeVeiculoServico: "carro", statusVeiculo: "livre"});
    await VeiculoEmpresa.create({placa: "GGG7777", cor: "Verde", modelo: "F4000", tipoDeVeiculoServico: "caminhaoLanca", statusVeiculo: "livre"});
    await VeiculoEmpresa.create({placa: "HHH8888", cor: "Preto", modelo: "CG 150", tipoDeVeiculoServico: "moto", statusVeiculo: "livre"});

    await Empresa.create({nome: "GuinchoLink", cnpj: "11.1265.825/0001-22", endereco: "Rua Luis Pena, 30. Castelo", telefone: "(28)94002-8922"});
})();

export default sequelize;