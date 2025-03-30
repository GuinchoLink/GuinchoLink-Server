import Sequelize from 'sequelize';
import { Cliente } from '../models/Cliente.js';
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

    // Inserção de 4 Clientes
    await Cliente.create({ nome: "Alberto", cpf: "111.111.111-11", nascimento: "2001-01-01" });
    await Cliente.create({ nome: "Bernardo", cpf: "222.222.222-22", nascimento: "2002-02-02" });
    await Cliente.create({ nome: "Carolina", cpf: "333.333.333-33", nascimento: "1990-03-15" });
    await Cliente.create({ nome: "Daniela", cpf: "444.444.444-44", nascimento: "1985-07-20" });

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