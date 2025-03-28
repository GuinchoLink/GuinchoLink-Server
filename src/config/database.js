import Sequelize from 'sequelize';
import {Cliente} from '../models/Cliente.js';
import { Administrador } from '../models/Administrador.js';
import { Funcionario } from '../models/Funcionario.js';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite'
});

Cliente.init(sequelize);
Administrador.init(sequelize);
Funcionario.init(sequelize);

(async () => {
    await sequelize.sync({ force: true });
    await Cliente.create({nome: "Alberto", cpf: "111.111.111-11", nascimento: "2001-01-01"});
  
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

    await Cliente.create({nome: "Vinicius", cpf: "222.222.222-22", nascimento: "2005-05-05"});
    await Cliente.create({nome: "Pedro", cpf: "222.222.444-22", nascimento: "2008-02-02"});
    
    await Administrador.create({nome: "Yuri", cpf: "111.111.111-11", nascimento: "2003-01-01", login: "teste", senha: "senha" });
    await Administrador.create({nome: "Marcos", cpf: "222.222.222-22", nascimento: "2004-02-02", login: "teste", senha: "senha"});
    await Administrador.create({nome: "Vinicius", cpf: "222.222.222-22", nascimento: "2005-05-05", login: "teste", senha: "senha"});
    await Administrador.create({nome: "Pedro", cpf: "222.222.444-22", nascimento: "2008-02-02", login: "teste", senha: "senha"});
    
    await Funcionario.create({nome: "Wagner", cpf: "555.555.555-55", nascimento: "2003-01-01", cnh: "12345678", categoria_cnh: "ABCD"});
    await Funcionario.create({nome: "Marcos", cpf: "222.222.222-22", nascimento: "2004-02-02", cnh: "12345678", categoria_cnh: "ABCD"});
    await Funcionario.create({nome: "Vinicius", cpf: "222.222.222-22", nascimento: "2005-05-05", cnh: "12345678", categoria_cnh: "ABCD"});
    await Funcionario.create({nome: "Souza", cpf: "222.222.222-22", nascimento: "2004-02-02", cnh: "12345678", categoria_cnh: "ABCD"});

})();

export default sequelize;