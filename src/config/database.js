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
    await Cliente.create({nome: "Bernardo", cpf: "222.222.222-22", nascimento: "2002-02-02"});
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