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
    statusVeiculo: "livre",
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
  const servico1 = await Servico.create({
    hora_solicitacao: "2025-03-28 10:00:00",
    descricao: "Reboque de carro quebrado",
    status: "pendente",
    localizacao: "Rua A, 123",
    tipo_servico_id: tipo1.id,
    funcionario_id: funcionario1.id,
    veiculo_cliente_id: veiculoCliente1.id,
    veiculo_empresa_id: veiculoEmpresa1.id,
    clienteId: cliente1.id
  });

  const servico2 = await Servico.create({
    hora_solicitacao: "2025-03-28 12:00:00",
    descricao: "Guincho para caminhão",
    status: "andamento",
    localizacao: "Avenida B, 456",
    tipo_servico_id: tipo2.id,
    funcionario_id: funcionario2.id,
    veiculo_cliente_id: veiculoCliente2.id,
    veiculo_empresa_id: veiculoEmpresa2.id,
    clienteId: cliente2.id
  });

  const servico3 = await Servico.create({
    hora_solicitacao: "2025-03-29 09:30:00",
    descricao: "Troca de pneu furado na rodovia",
    status: "finalizado",
    localizacao: "Rodovia C, km 78",
    tipo_servico_id: tipo3.id,
    funcionario_id: funcionario3.id,
    veiculo_cliente_id: veiculoCliente1.id,
    veiculo_empresa_id: veiculoEmpresa1.id,
    clienteId: cliente3.id
  });

  const servico4 = await Servico.create({
    hora_solicitacao: "2025-03-29 14:15:00",
    descricao: "Problema com bateria do veículo",
    status: "pendente",
    localizacao: "Rua D, 789",
    tipo_servico_id: tipo4.id,
    funcionario_id: funcionario4.id,
    veiculo_cliente_id: veiculoCliente2.id,
    veiculo_empresa_id: veiculoEmpresa2.id,
    clienteId: cliente4.id
  });

  // Inserção de Fim de Serviço
  const fimservico1 = await FimServico.create({
    hora_finalizacao: "2025-03-28 14:00:00",
    descricao_fim: "Serviço concluído com sucesso",
    valorTotal: 150.0,
    servico_id: servico1.id,
  });

  const fimservico2 = await FimServico.create({
    hora_finalizacao: "2025-03-28 16:00:00",
    descricao_fim: "Serviço em andamento finalizado",
    valorTotal: 200.0,
    servico_id: servico2.id,
  });

  const fimservico3 = await FimServico.create({
    hora_finalizacao: "2025-03-29 10:45:00",
    descricao_fim: "Pneu trocado e calibrado",
    valorTotal: 80.0,
    servico_id: servico3.id,
  });

  const fimservico4 = await FimServico.create({
    hora_finalizacao: "2025-03-29 15:30:00",
    descricao_fim: "Bateria substituída e sistema elétrico verificado",
    valorTotal: 120.0,
    servico_id: servico4.id,
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
