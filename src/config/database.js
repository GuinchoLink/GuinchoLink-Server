import Sequelize from "sequelize";
import { Cliente } from "../models/Cliente.js";
import { Administrador } from "../models/Administrador.js";
import { Funcionario } from "../models/Funcionario.js";
import { VeiculoCliente } from "../models/VeiculoCliente.js";
import { Empresa } from "../models/Empresa.js";
import { VeiculoEmpresa } from "../models/VeiculoEmpresa.js";
import { Servico } from "../models/Servico.js";
import { TipoServico } from "../models/TipoServico.js";
import { FimServico } from "../models/FimServico.js";
import { Feedback } from "../models/Feedback.js";

/**
 * Arquivo de seed do banco de dados com valores iniciais
 * 
 * REGRA DE NEGÓCIO DE DESCONTO:
 * Quando um cliente possuir 3 ou mais serviços finalizados no mesmo mês,
 * ele terá direito a um desconto de 10% em todos os serviços subsequentes no mesmo mês.
 * 
 * Neste seed, cliente1 já tem exatamente 3 serviços finalizados em maio/2025,
 * portanto o próximo serviço que for finalizado para ele nesse mês
 * terá desconto de 10% automaticamente pelo FimServicoService.
 */

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "GuinchoLink.sqlite",
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
Cliente.associate && Cliente.associate(sequelize.models);
VeiculoCliente.associate(sequelize.models);
VeiculoEmpresa.associate && VeiculoEmpresa.associate(sequelize.models);
Empresa.associate && Empresa.associate(sequelize.models);
Administrador.associate && Administrador.associate(sequelize.models);
Funcionario.associate && Funcionario.associate(sequelize.models);

(async () => {
  await sequelize.sync({ force: true });

  // Inserção de 3 Clientes
  const cliente1 = await Cliente.create({
    nome: "Alberto Santos",
    cpf: "111.111.111-11",
    nascimento: "2001-01-01",
    telefone: "28 99999-9999",
    endereco: "Rua dos Bobos, 0",
  });
  
  const cliente2 = await Cliente.create({
    nome: "Marcos Silva",
    cpf: "222.222.222-22",
    nascimento: "2004-02-02",
    telefone: "28 98888-8888",
    endereco: "Avenida Principal, 123",
  });
  
  const cliente3 = await Cliente.create({
    nome: "Vinicius Oliveira",
    cpf: "333.333.333-33",
    nascimento: "2005-05-05",
    telefone: "28 97777-7777",
    endereco: "Praça Central, 45",
  });

  const cliente4 = await Cliente.create({
    nome: "Bruno Costa",
    cpf: "333.333.221-33",
    nascimento: "2000-05-05",
    telefone: "28 97337-7777",
    endereco: "Praça Central do morro, 5",
  });

  // Inserção de 3 Veículos de Cliente (com clienteId obrigatório)
  const veiculoCliente1 = await VeiculoCliente.create({
    placa: "ABC1156",
    cor: "Azul",
    modelo: "Fusca",
    tipoDeVeiculo: "carro",
    clienteId: cliente1.id,
  });
  
  const veiculoCliente2 = await VeiculoCliente.create({
    placa: "BHG2222",
    cor: "Vermelho",
    modelo: "Gol",
    tipoDeVeiculo: "carro",
    clienteId: cliente2.id,
  });
  
  const veiculoCliente3 = await VeiculoCliente.create({
    placa: "CIU3333",
    cor: "Verde",
    modelo: "F4000",
    tipoDeVeiculo: "caminhao",
    clienteId: cliente3.id,
  });

  const veiculoCliente4 = await VeiculoCliente.create({
    placa: "CUR3903",
    cor: "Verde",
    modelo: "Gol",
    tipoDeVeiculo: "carro",
    clienteId: cliente4.id,
  });

  // Inserção de 3 Veículos da Empresa (2 livres, 1 em uso)
  const veiculoEmpresa1 = await VeiculoEmpresa.create({
    placa: "DDD9098",
    cor: "Preto",
    modelo: "CG 150",
    tipoDeVeiculoServico: "moto",
    statusVeiculo: "livre",
  });
  
  const veiculoEmpresa2 = await VeiculoEmpresa.create({
    placa: "EEE9411",
    cor: "Azul",
    modelo: "F5000",
    tipoDeVeiculoServico: "caminhaoPrancha",
    statusVeiculo: "emUso",
  });
  
  const veiculoEmpresa3 = await VeiculoEmpresa.create({
    placa: "KTR5693",
    cor: "Branco",
    modelo: "Strada",
    tipoDeVeiculoServico: "pickup",
    statusVeiculo: "emUso", // Um veículo em uso para demonstrar a regra de negócio
  });

  const veiculoEmpresa4 = await VeiculoEmpresa.create({
    placa: "MQU0993",
    cor: "Branco",
    modelo: "Saveiro",
    tipoDeVeiculoServico: "pickup",
    statusVeiculo: "emUso", // Um veículo em uso para demonstrar a regra de negócio
  });

  // Inserção de 1 Empresa
  await Empresa.create({
    nome: "GuinchoLink",
    cnpj: "11.125.825/0001-22",
    endereco: "Rua Luis Pena, 30. Castelo",
    telefone: "00 94002-8922",
  });

  // Inserção de 3 Administradores
  await Administrador.create({
    nome: "Yuri Administrador",
    cpf: "444.444.444-44",
    nascimento: "2003-01-01",
    login: "admin1",
    senha: "senha123",
  });
  
  await Administrador.create({
    nome: "Marcos Gestor",
    cpf: "555.555.555-55",
    nascimento: "2004-02-02",
    login: "admin2",
    senha: "senha456",
  });
  
  await Administrador.create({
    nome: "Vinicius Supervisor",
    cpf: "666.666.666-66",
    nascimento: "2005-05-05",
    login: "admin3",
    senha: "senha789",
  });

  // Inserção de 3 Funcionários
  const funcionario1 = await Funcionario.create({
    nome: "Wagner Motorista",
    cpf: "777.777.777-77",
    nascimento: "2003-01-01",
    telefone: "28 99999-9999",
    endereco: "Rua dos Motoristas, 10",
    cnh: "12345678",
    categoria_cnh: "ABCD",
  });
  
  const funcionario2 = await Funcionario.create({
    nome: "Marcos Técnico",
    cpf: "888.888.888-88",
    nascimento: "2004-02-02",
    telefone: "28 98888-8888",
    endereco: "Avenida dos Técnicos, 20",
    cnh: "23456789",
    categoria_cnh: "ABCD",
  });
  
  const funcionario3 = await Funcionario.create({
    nome: "Vinicius Mecânico",
    cpf: "999.999.999-99",
    nascimento: "2005-05-05",
    telefone: "28 97777-7777",
    endereco: "Praça dos Mecânicos, 30",
    cnh: "34567890",
    categoria_cnh: "ABCD",
  });

  // Inserção de 3 Tipos de Serviço
  const tipo1 = await TipoServico.create({
    valor_hora: 50.0,
    nome: "Reboque",
    descricao: "Serviço de reboque de veículos",
  });
  
  const tipo2 = await TipoServico.create({
    valor_hora: 70.0,
    nome: "Guincho",
    descricao: "Serviço de guincho para veículos pesados",
  });
  
  const tipo3 = await TipoServico.create({
    valor_hora: 40.0,
    nome: "Troca de Pneu",
    descricao: "Serviço de troca de pneu na estrada",
  });
  // Inserção de Serviços para cliente1 (exatamente 3 finalizados no mesmo mês)
  // Após adicionar estes 3 serviços, o próximo serviço do cliente1 terá desconto automático de 10%
  const servico1 = await Servico.create({
    hora_solicitacao: "2025-05-01 10:00:00", // Serviço #1 - Mesmo mês (maio/2025)
    descricao: "Reboque de carro quebrado",
    status: "finalizado",
    localizacao: "Rua A, 123",
    tipo_servico_id: tipo1.id,
    funcionario_id: funcionario1.id,
    veiculo_cliente_id: veiculoCliente1.id,
    veiculo_empresa_id: veiculoEmpresa1.id,
    clienteId: cliente1.id
  });

  const servico2 = await Servico.create({
    hora_solicitacao: "2025-05-05 12:00:00", // Serviço #2 - Mesmo mês (maio/2025)
    descricao: "Guincho para caminhão",
    status: "finalizado",
    localizacao: "Avenida B, 456",
    tipo_servico_id: tipo2.id,
    funcionario_id: funcionario2.id,
    veiculo_cliente_id: veiculoCliente1.id,
    veiculo_empresa_id: veiculoEmpresa2.id,
    clienteId: cliente1.id
  });

  const servico3 = await Servico.create({
    hora_solicitacao: "2025-05-10 09:30:00", // Serviço #3 - Mesmo mês (maio/2025)
    descricao: "Troca de pneu furado na rodovia",
    status: "finalizado",
    localizacao: "Rodovia C, km 78",
    tipo_servico_id: tipo3.id,
    funcionario_id: funcionario3.id,
    veiculo_cliente_id: veiculoCliente1.id,
    veiculo_empresa_id: veiculoEmpresa1.id,
    clienteId: cliente1.id
  });

  // Um serviço adicional para cliente1 que deve receber desconto (pois é o 4º serviço no mês)
  const servico4 = await Servico.create({
    hora_solicitacao: "2025-05-15 14:15:00", // Mesmo mês (4º serviço = desconto!)
    descricao: "Problema com bateria do veículo",
    status: "andamento",
    localizacao: "Rua D, 789",
    tipo_servico_id: tipo2.id,
    funcionario_id: funcionario1.id,
    veiculo_cliente_id: veiculoCliente1.id,
    veiculo_empresa_id: veiculoEmpresa2.id,
    clienteId: cliente1.id
  });


  // Um serviço associado ao veículo em uso (veiculoEmpresa3) 
  // Isso demonstra o motivo pelo qual o veículo está com status "emUso"
  const servico5 = await Servico.create({
    hora_solicitacao: "2025-05-14 11:45:00",
    descricao: "Socorro para carro sem combustível",
    status: "andamento", // Ainda pendente, explicando por que o veículo está em uso
    localizacao: "Rua F, 890",
    tipo_servico_id: tipo3.id,
    funcionario_id: funcionario3.id,
    veiculo_cliente_id: veiculoCliente3.id,
    veiculo_empresa_id: veiculoEmpresa3.id,
    clienteId: cliente3.id
  });
  // Inserção de FimServico para os serviços finalizados
  // Após estes 3 serviços finalizados para cliente1 no mesmo mês,
  // o próximo serviço que for finalizado para cliente1 terá desconto de 10%

  const servico6 = await Servico.create({
    hora_solicitacao: "2025-05-29 11:45:00",
    descricao: "Socorro para carro sem combustível",
    status: "finalizado",
    localizacao: "Rua F, 890",
    tipo_servico_id: tipo3.id,
    funcionario_id: funcionario3.id,
    veiculo_cliente_id: veiculoCliente4.id,
    veiculo_empresa_id: veiculoEmpresa4.id,
    clienteId: cliente4.id
  });

  // FimServico para serviço1 - sem desconto (primeiro serviço)
  const fimServico1 = await FimServico.create({
    hora_finalizacao: "2025-05-01 11:30:00",
    descricao_fim: "Veículo rebocado com sucesso",
    valorTotal: 100.0,
    on_sale: false, // Sem desconto (primeiro serviço do mês)
    servico_id: servico1.id
  });

  // FimServico para serviço2 - sem desconto (segundo serviço)
  const fimServico2 = await FimServico.create({
    hora_finalizacao: "2025-05-05 13:30:00",
    descricao_fim: "Guincho realizado com sucesso",
    valorTotal: 140.0,
    on_sale: false, // Sem desconto (segundo serviço do mês)
    servico_id: servico2.id
  });

  // FimServico para serviço3 - sem desconto (terceiro serviço do cliente1)
  const fimServico3 = await FimServico.create({
    hora_finalizacao: "2025-05-10 10:45:00", 
    descricao_fim: "Pneu trocado com sucesso",
    valorTotal: 80.0,
    on_sale: false, // Sem desconto (terceiro serviço do mês)
    servico_id: servico3.id
  });

  const fimServico4 = await FimServico.create({
    hora_finalizacao: "2025-06-10 10:45:00", 
    descricao_fim: "Bateria trocado com sucesso",
    valorTotal: 170.0,
    on_sale: false, // Sem desconto (terceiro serviço do mês)
    servico_id: servico6.id
  });

  // Inserção de 3 Feedbacks, o 4 será de forma manual
  await Feedback.create({
    nota: 5,
    comentario: "Excelente serviço, muito rápido e eficiente!",
    fim_servico_id: fimServico1.id,
  });

  await Feedback.create({
    nota: 4,
    comentario: "Bom serviço, mas poderia ser mais rápido.",
    fim_servico_id: fimServico2.id,
  });

  await Feedback.create({
    nota: 5,
    comentario: "Atendimento excepcional, resolveu meu problema rapidamente!",
    fim_servico_id: fimServico3.id,
  });

})();

export default sequelize;
