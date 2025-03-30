import Sequelize from 'sequelize';

import { Cliente } from '../models/Cliente.js';
import { Administrador } from '../models/Administrador.js';
import { Funcionario } from '../models/Funcionario.js';
import { VeiculoCliente } from '../models/VeiculoCliente.js'
import { Empresa } from '../models/Empresa.js'
import { VeiculoEmpresa } from '../models/VeiculoEmpresa.js'
import { Servico } from '../models/Servico.js';
import { TipoServico } from '../models/TipoServico.js';
import { FimServico } from '../models/FimServico.js';
import { Feedback } from '../models/Feedback.js';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'GuinchoLink.sqlite'
});

// Inicialização dos modelos
Cliente.init(sequelize);
VeiculoCliente.init(sequelize);
VeiculoEmpresa.init(sequelize);
Empresa.init(sequelize);
Administrador.init(sequelize);
Funcionario.init(sequelize);
TipoServico.init(sequelize);
Servico.init(sequelize);
FimServico.init(sequelize);
Feedback.init(sequelize);

// Configuração das associações
Servico.associate(sequelize.models);
TipoServico.associate(sequelize.models);
FimServico.associate(sequelize.models);
Feedback.associate(sequelize.models);

(async () => {
    await sequelize.sync({ force: true });

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

    // Inserção de 4 Tipos de Serviço
    const tipo1 = await TipoServico.create({ valor_hora: 50.0, nome: "Reboque", descricao: "Serviço de reboque de veículos" });
    const tipo2 = await TipoServico.create({ valor_hora: 70.0, nome: "Guincho", descricao: "Serviço de guincho para veículos pesados" });
    const tipo3 = await TipoServico.create({ valor_hora: 40.0, nome: "Troca de Pneu", descricao: "Serviço de troca de pneu na estrada" });
    const tipo4 = await TipoServico.create({ valor_hora: 60.0, nome: "Socorro Elétrico", descricao: "Serviço de assistência para problemas elétricos" });

    // Inserção de 4 Serviços
    const servico1 = await Servico.create({
        hora_solicitacao: "2025-03-28 10:00:00",
        descricao: "Reboque de carro quebrado",
        status: "pendente",
        localizacao: "Rua A, 123",
        tipo_servico_id: tipo1.id
    });

    const servico2 = await Servico.create({
        hora_solicitacao: "2025-03-28 12:00:00",
        descricao: "Guincho para caminhão",
        status: "andamento",
        localizacao: "Avenida B, 456",
        tipo_servico_id: tipo2.id
    });

    const servico3 = await Servico.create({
        hora_solicitacao: "2025-03-29 09:30:00",
        descricao: "Troca de pneu furado na rodovia",
        status: "finalizado",
        localizacao: "Rodovia C, km 78",
        tipo_servico_id: tipo3.id
    });

    const servico4 = await Servico.create({
        hora_solicitacao: "2025-03-29 14:15:00",
        descricao: "Problema com bateria do veículo",
        status: "pendente",
        localizacao: "Rua D, 789",
        tipo_servico_id: tipo4.id
    });

    // Inserção de 4 Fim de Serviço
    await FimServico.create({
        hora_finalizacao: "2025-03-28 14:00:00",
        descricao_fim: "Serviço concluído com sucesso",
        valorTotal: 150.0,
        servico_id: servico1.id
    });

    await FimServico.create({
        hora_finalizacao: "2025-03-28 16:00:00",
        descricao_fim: "Serviço em andamento finalizado",
        valorTotal: 200.0,
        servico_id: servico2.id
    });

    await FimServico.create({
        hora_finalizacao: "2025-03-29 10:45:00",
        descricao_fim: "Pneu trocado e calibrado",
        valorTotal: 80.0,
        servico_id: servico3.id
    });

    await FimServico.create({
        hora_finalizacao: "2025-03-29 15:30:00",
        descricao_fim: "Bateria substituída e sistema elétrico verificado",
        valorTotal: 120.0,
        servico_id: servico4.id
    });

    // Inserção de 4 Feedback
    await Feedback.create({
        nota: 5,
        comentario: "Excelente serviço, muito rápido e eficiente!",
        servico_id: servico1.id
    });

    await Feedback.create({
        nota: 4,
        comentario: "Bom serviço, mas poderia ser mais rápido.",
        servico_id: servico2.id
    });

    await Feedback.create({
        nota: 5,
        comentario: "Atendimento excepcional, resolveu meu problema rapidamente!",
        servico_id: servico3.id
    });

    await Feedback.create({
        nota: 3,
        comentario: "Serviço adequado, mas preço um pouco alto para o problema.",
        servico_id: servico4.id
    });

    console.log("Banco de dados inicializado com dados de exemplo!");
})();

export default sequelize;