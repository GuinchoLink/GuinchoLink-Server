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

  // Inserção de Clientes primeiro
  const cliente1 = await Cliente.create({
    nome: "Alberto",
    cpf: "111.111.111-11",
    nascimento: "2001-01-01",
    telefone: "28 99999-9999",
    endereco: "Rua dos Bobos, 0",
  });
  const cliente2 = await Cliente.create({
    nome: "Marcos",
    cpf: "222.222.222-22",
    nascimento: "2004-02-02",
    telefone: "28 99999-9999",
    endereco: "Rua dos Bobos, 0",
  });
  const cliente3 = await Cliente.create({
    nome: "Vinicius",
    cpf: "333.333.333-33",
    nascimento: "2005-05-05",
    telefone: "28 99999-9999",
    endereco: "Rua dos Bobos, 0",
  });
  const cliente4 = await Cliente.create({
    nome: "Pedro",
    cpf: "444.444.444-44",
    nascimento: "2008-02-02",
    telefone: "28 99999-9999",
    endereco: "Rua dos Bobos, 0",
  });
  const cliente5 = await Cliente.create({
    nome: "Souza",
    cpf: "555.555.555-55",
    nascimento: "2008-02-02",
    telefone: "28 99999-9999",
    endereco: "Rua dos Bobos, 0",
  });

  // Inserção de Veículos de Cliente com clienteId obrigatório
  const veiculoCliente1 = await VeiculoCliente.create({
    placa: "ABC1156",
    cor: "Azul",
    modelo: "Fusca",
    tipoDeVeiculo: "van",
    clienteId: cliente1.id,
  });
  const veiculoCliente2 = await VeiculoCliente.create({
    placa: "BHG2222",
    cor: "Vermelho",
    modelo: "Gol",
    tipoDeVeiculo: "carro",
    clienteId: cliente2.id,
  });
  await VeiculoCliente.create({
    placa: "CIU3333",
    cor: "Verde",
    modelo: "F4000",
    tipoDeVeiculo: "caminhao",
    clienteId: cliente3.id,
  });
  await VeiculoCliente.create({
    placa: "SGA7G15",
    cor: "Prata",
    modelo: "Onix",
    tipoDeVeiculo: "carro",
    clienteId: cliente4.id,
  });
  await VeiculoCliente.create({
    placa: "EEE5555",
    cor: "Amarelo",
    modelo: "Mazerati",
    tipoDeVeiculo: "carro",
    clienteId: cliente5.id,
  });

  // Inserção de Veículos da Empresa
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
  await VeiculoEmpresa.create({
    placa: "LPU6A87",
    cor: "Vermelho",
    modelo: "Gol",
    tipoDeVeiculoServico: "carro",
    statusVeiculo: "livre",
  });
  await VeiculoEmpresa.create({
    placa: "LPO7H28",
    cor: "Verde",
    modelo: "F4000",
    tipoDeVeiculoServico: "caminhaoLanca",
    statusVeiculo: "livre",
  });
  await VeiculoEmpresa.create({
    placa: "JHP2178",
    cor: "Preto",
    modelo: "CG 150",
    tipoDeVeiculoServico: "moto",
    statusVeiculo: "livre",
  });

  await Empresa.create({
    nome: "GuinchoLink",
    cnpj: "11.125.825/0001-22",
    endereco: "Rua Luis Pena, 30. Castelo",
    telefone: "00 94002-8922",
  });

  await Administrador.create({
    nome: "Yuri",
    cpf: "111.111.111-11",
    nascimento: "2003-01-01",
    login: "teste",
    senha: "senha576",
  });
  await Administrador.create({
    nome: "Marcos",
    cpf: "238.291.120-10",
    nascimento: "2004-02-02",
    login: "teste",
    senha: "senha109",
  });
  await Administrador.create({
    nome: "Vinicius",
    cpf: "333.209.092-87",
    nascimento: "2005-05-05",
    login: "teste",
    senha: "senha309",
  });
  await Administrador.create({
    nome: "Pedro",
    cpf: "222.222.444-22",
    nascimento: "2008-02-02",
    login: "teste",
    senha: "senha3094",
  });

  // Inserção de Funcionários
  const funcionario1 = await Funcionario.create({
    nome: "Wagner",
    cpf: "555.555.555-55",
    nascimento: "2003-01-01",
    telefone: "28 99999-9999",
    endereco: "rua teste",
    cnh: "12345678",
    categoria_cnh: "ABCD",
  });
  const funcionario2 = await Funcionario.create({
    nome: "Marcos",
    cpf: "222.222.222-22",
    nascimento: "2004-02-02",
    telefone: "28 99999-9999",
    endereco: "rua teste",
    cnh: "12345678",
    categoria_cnh: "ABCD",
  });
  const funcionario3 = await Funcionario.create({
    nome: "Vinicius",
    cpf: "092.398.847-78",
    nascimento: "2005-05-05",
    telefone: "28 99999-9999",
    endereco: "rua teste",
    cnh: "12345678",
    categoria_cnh: "ABCD",
  });
  const funcionario4 = await Funcionario.create({
    nome: "Souza",
    cpf: "938.934.837-20",
    nascimento: "2004-02-02",
    telefone: "28 99999-9999",
    endereco: "rua teste",
    cnh: "12345678",
    categoria_cnh: "ABCD",
  });
  const funcionario5 = await Funcionario.create({
    nome: "Helio",
    cpf: "155.934.837-24",
    nascimento: "2003-02-23",
    telefone: "28 45599-9999",
    endereco: "rua ifes",
    cnh: "32456780",
    categoria_cnh: "ABCD",
  });

  // Inserção de Tipos de Serviço
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
  const tipo4 = await TipoServico.create({
    valor_hora: 60.0,
    nome: "Socorro Elétrico",
    descricao: "Serviço de assistência para problemas elétricos",
  });
  // Inserção de Serviços
  // Serviços do cliente 1 (terá 3 serviços finalizados no mesmo mês para receber o desconto)
  const servico1 = await Servico.create({
    hora_solicitacao: "2025-05-10 10:00:00",
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
    hora_solicitacao: "2025-05-10 12:00:00",
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
    hora_solicitacao: "2025-05-10 09:30:00",
    descricao: "Troca de pneu furado na rodovia",
    status: "finalizado",
    localizacao: "Rodovia C, km 78",
    tipo_servico_id: tipo3.id,
    funcionario_id: funcionario3.id,
    veiculo_cliente_id: veiculoCliente1.id,
    veiculo_empresa_id: veiculoEmpresa1.id,
    clienteId: cliente1.id
  });

  const servico4 = await Servico.create({
    hora_solicitacao: "2025-05-10 14:15:00",
    descricao: "Problema com bateria do veículo",
    status: "pendente", // Um quarto serviço pendente (ainda não finalizado)
    localizacao: "Rua D, 789",
    tipo_servico_id: tipo4.id,
    funcionario_id: funcionario4.id,
    veiculo_cliente_id: veiculoCliente1.id,
    veiculo_empresa_id: veiculoEmpresa2.id,
    clienteId: cliente1.id
  });

  // Serviços para outros clientes (sem acumular 3 serviços finalizados no mesmo mês)
  const servico5 = await Servico.create({
    hora_solicitacao: "2025-05-09 10:30:00",
    descricao: "Reboque de carro com motor fundido",
    status: "finalizado",
    localizacao: "Avenida E, 567",
    tipo_servico_id: tipo1.id,
    funcionario_id: funcionario1.id,
    veiculo_cliente_id: veiculoCliente2.id,
    veiculo_empresa_id: veiculoEmpresa1.id,
    clienteId: cliente2.id
  });

  const servico6 = await Servico.create({
    hora_solicitacao: "2025-05-14 11:45:00",
    descricao: "Socorro para carro sem combustível",
    status: "finalizado",
    localizacao: "Rua F, 890",
    tipo_servico_id: tipo4.id,
    funcionario_id: funcionario2.id,
    veiculo_cliente_id: veiculoCliente2.id,
    veiculo_empresa_id: veiculoEmpresa2.id,
    clienteId: cliente2.id
  });
  // Inserção de Fim de Serviço para testar regras de desconto
  
  // Cria mais um serviço para cliente1 (para ter pelo menos 3 serviços no mesmo mês)
  const servico7 = await Servico.create({
    hora_solicitacao: "2025-05-18 09:00:00",
    descricao: "Auxílio para veículo atolado",
    status: "finalizado",
    localizacao: "Estrada Rural, km 22",
    tipo_servico_id: tipo1.id,
    funcionario_id: funcionario1.id,
    veiculo_cliente_id: veiculoCliente1.id,
    veiculo_empresa_id: veiculoEmpresa1.id,
    clienteId: cliente1.id
  });
  
  // Cria um quarto serviço para cliente1 (este terá o desconto aplicado)
  const servico8 = await Servico.create({
    hora_solicitacao: "2025-05-20 11:00:00",
    descricao: "Troca de óleo emergencial",
    status: "finalizado",
    localizacao: "Avenida Principal, 1500",
    tipo_servico_id: tipo3.id,
    funcionario_id: funcionario3.id,
    veiculo_cliente_id: veiculoCliente1.id,
    veiculo_empresa_id: veiculoEmpresa1.id,
    clienteId: cliente1.id
  });
  
  // Registros de finalização para os serviços do cliente 1 (mesmo mês)
  const fimservico1 = await FimServico.create({
    hora_finalizacao: "2025-05-01 12:30:00",
    descricao_fim: "Serviço realizado com sucesso",
    valorTotal: 150.0,
    on_sale: false, // Primeiro serviço, sem desconto
    servico_id: servico1.id
  });

  const fimservico2 = await FimServico.create({
    hora_finalizacao: "2025-05-05 14:45:00",
    descricao_fim: "Veículo guinchado até a oficina",
    valorTotal: 220.0,
    on_sale: false, // Segundo serviço, sem desconto
    servico_id: servico2.id
  });

  const fimservico3 = await FimServico.create({
    hora_finalizacao: "2025-05-10 10:15:00",
    descricao_fim: "Pneu trocado no local",
    valorTotal: 80.0,
    on_sale: false, // Terceiro serviço, ainda sem desconto
    servico_id: servico3.id
  });
  
  const fimservico4 = await FimServico.create({
    hora_finalizacao: "2025-05-18 11:30:00",
    descricao_fim: "Veículo desatolado com sucesso",
    valorTotal: 200.0, 
    on_sale: true, // Quarto serviço, com desconto (pois já tem 3 serviços no mês)
    servico_id: servico7.id
  });
  
  const fimservico5 = await FimServico.create({
    hora_finalizacao: "2025-05-20 13:00:00",
    descricao_fim: "Troca de óleo realizada e revisão básica concluída",
    valorTotal: 90.0, // Este valor já está com desconto de 10%
    on_sale: true, // Quinto serviço, também com desconto (pois já tem mais de 3 serviços no mês)
    servico_id: servico8.id
  });

  // Registros de finalização para os serviços de outros clientes
  const fimservico6 = await FimServico.create({
    hora_finalizacao: "2025-05-12 12:00:00",
    descricao_fim: "Veículo rebocado com sucesso",
    valorTotal: 180.0,
    on_sale: false, // Sem desconto pois é o primeiro serviço do cliente 2 no mês
    servico_id: servico5.id
  });

  const fimservico7 = await FimServico.create({
    hora_finalizacao: "2025-05-14 13:30:00",
    descricao_fim: "Combustível fornecido e carro em funcionamento",
    valorTotal: 120.0,
    on_sale: false, // Sem desconto pois é o segundo serviço do cliente 2 no mês
    servico_id: servico6.id
  });

  // Inserção de Feedback
  await Feedback.create({
    nota: 5,
    comentario: "Excelente serviço, muito rápido e eficiente!",
    fim_servico_id: fimservico1.id,
  });

  await Feedback.create({
    nota: 4,
    comentario: "Bom serviço, mas poderia ser mais rápido.",
    fim_servico_id: fimservico2.id,
  });

  await Feedback.create({
    nota: 5,
    comentario: "Atendimento excepcional, resolveu meu problema rapidamente!",
    fim_servico_id: fimservico3.id,
  });

})();

export default sequelize;
