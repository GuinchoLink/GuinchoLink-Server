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
// FimServico.associate(sequelize.models);
// Feedback.associate(sequelize.models);

(async () => {
    await sequelize.sync({ force: true });

    // Inserção de Clientes
    await Cliente.create({ nome: "Alberto", cpf: "111.111.111-11", nascimento: "2001-01-01" });
    await Cliente.create({ nome: "Bernardo", cpf: "222.222.222-22", nascimento: "2002-02-02" });

    // Inserção de Tipos de Serviço
    const tipo1 = await TipoServico.create({ valor_hora: 50.0, nome: "Reboque", descricao: "Serviço de reboque de veículos" });
    const tipo2 = await TipoServico.create({ valor_hora: 70.0, nome: "Guincho", descricao: "Serviço de guincho para veículos pesados" });

    // Inserção de Serviços
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

    // Inserção de Fim de Serviço
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

    // Inserção de Feedback
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
})();

export default sequelize;