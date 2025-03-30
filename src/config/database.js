import Sequelize from 'sequelize';
import { Cliente } from '../models/Cliente.js';
import { Administrador } from '../models/Administrador.js';
import { Funcionario } from '../models/Funcionario.js';
import { VeiculoCliente } from '../models/VeiculoCliente.js'
import { Empresa } from '../models/Empresa.js'
import { VeiculoEmpresa } from '../models/VeiculoEmpresa.js'



const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite'
});

Cliente.init(sequelize);
Administrador.init(sequelize);
Funcionario.init(sequelize);
VeiculoCliente.init(sequelize);
Empresa.init(sequelize);
VeiculoEmpresa.init(sequelize);

(async () => {
    await sequelize.sync({ force: true });

    await Cliente.create({ nome: "Alberto", cpf: "111.111.111-11", nascimento: "2001-01-01", telefone: "(28) 99999-9999", endereco: "Rua dos Bobos, 0" });
    await Cliente.create({ nome: "Marcos", cpf: "222.222.222-22", nascimento: "2004-02-02", telefone: "(28) 99999-9999", endereco: "Rua dos Bobos, 0" });
    await Cliente.create({ nome: "Vinicius", cpf: "222.222.222-22", nascimento: "2005-05-05", telefone: "(28) 99999-9999", endereco: "Rua dos Bobos, 0" });
    await Cliente.create({ nome: "Pedro", cpf: "222.222.444-22", nascimento: "2008-02-02", telefone: "(28) 99999-9999", endereco: "Rua dos Bobos, 0" });
    await Cliente.create({ nome: "Souza", cpf: "222.222.444-22", nascimento: "2008-02-02", telefone: "(28) 99999-9999", endereco: "Rua dos Bobos, 0" });


    await Administrador.create({ nome: "Yuri", cpf: "111.111.111-11", nascimento: "2003-01-01", login: "teste", senha: "senha" });
    await Administrador.create({ nome: "Marcos", cpf: "222.222.222-22", nascimento: "2004-02-02", login: "teste", senha: "senha" });
    await Administrador.create({ nome: "Vinicius", cpf: "222.222.222-22", nascimento: "2005-05-05", login: "teste", senha: "senha" });
    await Administrador.create({ nome: "Pedro", cpf: "222.222.444-22", nascimento: "2008-02-02", login: "teste", senha: "senha" });

    await Funcionario.create({ nome: "Wagner", cpf: "555.555.555-55", nascimento: "2003-01-01", telefone: "2899999999", endereco: "rua teste", cnh: "12345678", categoria_cnh: "ABCD" });
    await Funcionario.create({ nome: "Marcos", cpf: "222.222.222-22", nascimento: "2004-02-02", telefone: "2899999999", endereco: "rua teste", cnh: "12345678", categoria_cnh: "ABCD" });
    await Funcionario.create({ nome: "Vinicius", cpf: "222.222.222-22", nascimento: "2005-05-05", telefone: "2899999999", endereco: "rua teste", cnh: "12345678", categoria_cnh: "ABCD" });
    await Funcionario.create({ nome: "Souza", cpf: "222.222.222-22", nascimento: "2004-02-02", telefone: "2899999999", endereco: "rua teste", cnh: "12345678", categoria_cnh: "ABCD" });

    await VeiculoCliente.create({ placa: "AAA1111", cor: "Azul", modelo: "Fusca", tipoDeVeiculo: "carro" });
    await VeiculoCliente.create({ placa: "BBB2222", cor: "Vermelho", modelo: "Gol", tipoDeVeiculo: "carro" });
    await VeiculoCliente.create({ placa: "CCC3333", cor: "Verde", modelo: "F4000", tipoDeVeiculo: "caminhao" });
    await VeiculoCliente.create({ placa: "DDD4444", cor: "Preto", modelo: "CG 150", tipoDeVeiculo: "moto" });
    await VeiculoCliente.create({ placa: "EEE5555", cor: "Amarelo", modelo: "Mazerati", tipoDeVeiculo: "carro" });

    await Empresa.create({ nome: "GuinchoLink", cnpj: "11.1265.825/0001-22", endereco: "Rua Luis Pena, 30. Castelo", telefone: "(28)94002-8922" });

    await VeiculoEmpresa.create({ placa: "DDD9098", cor: "Preto", modelo: "CG 150", tipoDeVeiculoServico: "moto", statusVeiculo: "livre" });
    await VeiculoEmpresa.create({ placa: "EEE9411", cor: "Azul", modelo: "F5000", tipoDeVeiculoServico: "caminhaoPrancha", statusVeiculo: "livre" });
    await VeiculoEmpresa.create({ placa: "FFF6666", cor: "Vermelho", modelo: "Gol", tipoDeVeiculoServico: "carro", statusVeiculo: "livre" });
    await VeiculoEmpresa.create({ placa: "GGG7777", cor: "Verde", modelo: "F4000", tipoDeVeiculoServico: "caminhaoLanca", statusVeiculo: "livre" });
    await VeiculoEmpresa.create({ placa: "HHH8888", cor: "Preto", modelo: "CG 150", tipoDeVeiculoServico: "moto", statusVeiculo: "livre" });



})();

export default sequelize;