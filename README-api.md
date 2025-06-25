# GuinchoLink-Server - Documentação da API

Esta documentação contém informações detalhadas sobre todas as rotas e endpoints da API GuinchoLink-Server.

## 📋 Índice

- [Autenticação](#-autenticação)
- [Clientes](#-clientes)
- [Empresas](#-empresas)
- [Administradores](#-administradores)
- [Funcionários](#-funcionários)
- [Veículos de Clientes](#-veículos-de-clientes)
- [Veículos de Empresas](#-veículos-de-empresas)
- [Tipos de Serviços](#-tipos-de-serviços)
- [Serviços](#-serviços)
- [Fim de Serviços](#-fim-de-serviços)
- [Feedback](#-feedback)
- [Códigos de Status](#-códigos-de-status)
- [Exemplos de Uso](#-exemplos-de-uso)

---

## 🔐 Autenticação

**Base URL**: `http://localhost:3333`

### Rotas Públicas (sem autenticação)

#### Login
- **POST** `/auth/login`
- **Descrição**: Realizar login no sistema
- **Body**:
```json
{
  "login": "admin1",
  "senha": "senha123"
}
```
- **Resposta de Sucesso**:
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "nome": "Administrador",
    "login": "admin1"
  }
}
```

#### Refresh Token
- **POST** `/auth/refresh`
- **Descrição**: Renovar access token
- **Body**:
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Logout
- **POST** `/auth/logout`
- **Descrição**: Realizar logout (invalidar tokens)
- **Headers**: `Authorization: Bearer <token>`

---

## 👤 Clientes

### Todas as rotas requerem autenticação (Header: `Authorization: Bearer <token>`)

#### Listar Todos os Clientes
- **GET** `/clientes`
- **Descrição**: Retorna todos os clientes cadastrados

#### Buscar Cliente por ID
- **GET** `/clientes/:id`
- **Descrição**: Retorna um cliente específico pelo ID
- **Parâmetros**: `id` (número) - ID do cliente

#### Criar Novo Cliente
- **POST** `/clientes`
- **Descrição**: Cria um novo cliente
- **Body**:
```json
{
  "nome": "João Silva",
  "cpf": "123.456.789-00",
  "nascimento": "1990-01-01",
  "telefone": "28 99999-9999",
  "endereco": "Rua das Flores, 123"
}
```

#### Atualizar Cliente
- **PUT** `/clientes/:id`
- **Descrição**: Atualiza dados de um cliente existente
- **Parâmetros**: `id` (número) - ID do cliente
- **Body**: Mesma estrutura do POST (campos opcionais)

#### Excluir Cliente
- **DELETE** `/clientes/:id`
- **Descrição**: Exclui um cliente
- **Parâmetros**: `id` (número) - ID do cliente

---

## 🏢 Empresas

#### Listar Todas as Empresas
- **GET** `/empresa`
- **Descrição**: Retorna todas as empresas cadastradas

#### Buscar Empresa por ID
- **GET** `/empresa/:id`
- **Descrição**: Retorna uma empresa específica pelo ID

#### Criar Nova Empresa
- **POST** `/empresa`
- **Body**:
```json
{
  "nome": "GuinchoLink Ltda",
  "cnpj": "12.345.678/0001-90",
  "endereco": "Av. Principal, 456",
  "telefone": "28 98888-8888"
}
```

#### Atualizar Empresa
- **PUT** `/empresa/:id`
- **Descrição**: Atualiza dados de uma empresa

#### Excluir Empresa
- **DELETE** `/empresa/:id`
- **Descrição**: Exclui uma empresa

---

## 👨‍💼 Administradores

#### Listar Todos os Administradores
- **GET** `/administrador`
- **Descrição**: Retorna todos os administradores

#### Buscar Administrador por ID
- **GET** `/administrador/:id`
- **Descrição**: Retorna um administrador específico

#### Criar Novo Administrador
- **POST** `/administrador`
- **Body**:
```json
{
  "nome": "Admin Teste",
  "cpf": "987.654.321-00",
  "nascimento": "1985-05-15",
  "login": "admin_teste",
  "senha": "senha123"
}
```
- **Nota**: A senha é automaticamente criptografada com BCrypt

#### Atualizar Administrador
- **PUT** `/administrador/:id`
- **Descrição**: Atualiza dados de um administrador

#### Excluir Administrador
- **DELETE** `/administrador/:id`
- **Descrição**: Exclui um administrador

---

## 👷 Funcionários

#### Listar Todos os Funcionários
- **GET** `/funcionario`
- **Descrição**: Retorna todos os funcionários

#### Buscar Funcionário por ID
- **GET** `/funcionario/:id`
- **Descrição**: Retorna um funcionário específico

#### Criar Novo Funcionário
- **POST** `/funcionario`
- **Body**:
```json
{
  "nome": "Carlos Motorista",
  "cpf": "111.222.333-44",
  "nascimento": "1992-03-10",
  "telefone": "28 97777-7777",
  "endereco": "Rua dos Trabalhadores, 789",
  "cnh": "12345678901",
  "categoria_cnh": "AB"
}
```

#### Atualizar Funcionário
- **PUT** `/funcionario/:id`
- **Descrição**: Atualiza dados de um funcionário

#### Excluir Funcionário
- **DELETE** `/funcionario/:id`
- **Descrição**: Exclui um funcionário

---

## 🚗 Veículos de Clientes

#### Listar Todos os Veículos de Clientes
- **GET** `/veiculoCliente`
- **Descrição**: Retorna todos os veículos de clientes

#### Buscar Veículos por Cliente
- **GET** `/veiculoCliente/cliente_id`
- **Descrição**: Retorna veículos de um cliente específico
- **Query Params**: `cliente_id` (número)

#### Buscar Veículo por ID
- **GET** `/veiculoCliente/:id`
- **Descrição**: Retorna um veículo específico

#### Criar Novo Veículo de Cliente
- **POST** `/veiculoCliente`
- **Body**:
```json
{
  "placa": "ABC1234",
  "cor": "Azul",
  "modelo": "Civic",
  "tipoDeVeiculo": "carro",
  "cliente_id": 1
}
```
- **Tipos de Veículo**: `"moto"`, `"carro"`, `"caminhao"`, `"pickup"`, `"carreta"`, `"trator"`, `"onibus"`, `"van"`, `"outro"`

#### Atualizar Veículo de Cliente
- **PUT** `/veiculoCliente/:id`
- **Descrição**: Atualiza dados de um veículo

#### Excluir Veículo de Cliente
- **DELETE** `/veiculoCliente/:id`
- **Descrição**: Exclui um veículo

---

## 🚛 Veículos de Empresas

#### Listar Todos os Veículos da Empresa
- **GET** `/veiculoEmpresa`
- **Descrição**: Retorna todos os veículos da empresa

#### Buscar Veículos por Status
- **GET** `/veiculoEmpresa/status`
- **Descrição**: Filtra veículos por status
- **Query Params**: `status` (`"livre"`, `"emUso"`, `"manutencao"`)

#### Buscar Veículo por ID
- **GET** `/veiculoEmpresa/:id`
- **Descrição**: Retorna um veículo específico

#### Criar Novo Veículo da Empresa
- **POST** `/veiculoEmpresa`
- **Body**:
```json
{
  "placa": "EMP5678",
  "cor": "Branco",
  "modelo": "F-4000",
  "tipo_de_veiculo_servico": "caminhaoPrancha",
  "status_veiculo": "livre"
}
```
- **Tipos**: `"moto"`, `"pickup"`, `"caminhaoPrancha"`, `"caminhaoLanca"`, `"carro"`
- **Status**: `"livre"`, `"emUso"`, `"manutencao"`

#### Atualizar Veículo da Empresa
- **PUT** `/veiculoEmpresa/:id`
- **Descrição**: Atualiza dados de um veículo

#### Excluir Veículo da Empresa
- **DELETE** `/veiculoEmpresa/:id`
- **Descrição**: Exclui um veículo

---

## 🛠️ Tipos de Serviços

#### Listar Todos os Tipos de Serviços
- **GET** `/tipos-servico`
- **Descrição**: Retorna todos os tipos de serviços

#### Buscar Tipo de Serviço por ID
- **GET** `/tipos-servico/:id`
- **Descrição**: Retorna um tipo de serviço específico

#### Criar Novo Tipo de Serviço
- **POST** `/tipos-servico`
- **Body**:
```json
{
  "valor_hora": 75.50,
  "nome": "Reboque Especializado",
  "descricao": "Serviço de reboque para veículos especiais"
}
```

#### Atualizar Tipo de Serviço
- **PUT** `/tipos-servico/:id`
- **Descrição**: Atualiza dados de um tipo de serviço

#### Excluir Tipo de Serviço
- **DELETE** `/tipos-servico/:id`
- **Descrição**: Exclui um tipo de serviço

---

## 📋 Serviços

#### Listar Todos os Serviços
- **GET** `/servicos`
- **Descrição**: Retorna todos os serviços

#### Buscar Serviços de um Cliente
- **GET** `/servicos/cliente/:cliente_id`
- **Descrição**: Retorna serviços de um cliente específico
- **Parâmetros**: `cliente_id` (número)

#### Buscar Serviços por Status
- **GET** `/servicos/status/:status`
- **Descrição**: Filtra serviços por status
- **Parâmetros**: `status` (`"andamento"`, `"pendente"`, `"finalizado"`, `"cancelado"`)

#### Buscar Serviço por ID
- **GET** `/servicos/:id`
- **Descrição**: Retorna um serviço específico

#### Criar Novo Serviço
- **POST** `/servicos`
- **Body**:
```json
{
  "hora_solicitacao": "2024-06-24T10:00:00Z",
  "descricao": "Reboque de veículo quebrado na estrada",
  "status": "pendente",
  "localizacao": "Rodovia BR-101, km 345",
  "tipo_servico_id": 1,
  "funcionario_id": 1,
  "veiculo_cliente_id": 1,
  "veiculo_empresa_id": 1,
  "cliente_id": 1
}
```
- **Regras de Negócio**:
  - Máximo 3 serviços por dia
  - Funcionário não pode ter mais de um serviço pendente
  - Veículo da empresa deve estar disponível

#### Atualizar Serviço
- **PUT** `/servicos/:id`
- **Descrição**: Atualiza dados de um serviço

#### Excluir Serviço
- **DELETE** `/servicos/:id`
- **Descrição**: Exclui um serviço

---

## ✅ Fim de Serviços

#### Listar Todas as Finalizações
- **GET** `/fim-servicos`
- **Descrição**: Retorna todas as finalizações de serviços

#### Estatísticas do Cliente
- **GET** `/fim-servicos/cliente-statistics/:cliente_id`
- **Descrição**: Retorna estatísticas de um cliente
- **GET** `/fim-servicos/cliente-statistics`
- **Descrição**: Retorna estatísticas gerais

#### Buscar por Serviço
- **GET** `/fim-servicos/servico/:servicoId`
- **Descrição**: Retorna finalização de um serviço específico

#### Buscar por Cliente
- **GET** `/fim-servicos/cliente/:cliente_id`
- **Descrição**: Retorna finalizações de um cliente

#### Buscar por ID
- **GET** `/fim-servicos/:id`
- **Descrição**: Retorna uma finalização específica

#### Criar Finalização de Serviço
- **POST** `/fim-servicos`
- **Body**:
```json
{
  "hora_finalizacao": "2024-06-24T12:00:00Z",
  "descricao_fim": "Serviço realizado com sucesso",
  "valor_total": 150.00,
  "servico_id": 1
}
```
- **Regra de Negócio**: Desconto automático de 10% para clientes com 3+ serviços no mês

#### Atualizar Finalização
- **PUT** `/fim-servicos/:id`
- **Descrição**: Atualiza dados de uma finalização

#### Excluir Finalização
- **DELETE** `/fim-servicos/:id`
- **Descrição**: Exclui uma finalização

---

## 💬 Feedback

#### Listar Todos os Feedbacks
- **GET** `/feedback`
- **Descrição**: Retorna todos os feedbacks

#### Buscar por Nota
- **GET** `/feedback/nota`
- **Descrição**: Filtra feedbacks por nota
- **Query Params**: `nota` (1-5)

#### Buscar por ID
- **GET** `/feedback/:id`
- **Descrição**: Retorna um feedback específico

#### Criar Novo Feedback
- **POST** `/feedback`
- **Body**:
```json
{
  "nota": 5,
  "comentario": "Excelente atendimento! Muito rápido e eficiente.",
  "fim_servico_id": 1
}
```
- **Nota**: De 1 a 5 estrelas

#### Atualizar Feedback
- **PUT** `/feedback/:id`
- **Descrição**: Atualiza um feedback

#### Excluir Feedback
- **DELETE** `/feedback/:id`
- **Descrição**: Exclui um feedback

---

## 📊 Códigos de Status

- **200** - OK (Sucesso)
- **201** - Created (Criado com sucesso)
- **400** - Bad Request (Erro de validação)
- **401** - Unauthorized (Não autenticado)
- **404** - Not Found (Recurso não encontrado)
- **500** - Internal Server Error (Erro interno)

---

## 🔍 Exemplos de Uso

### Fluxo Completo de Autenticação

1. **Login**:
```bash
curl -X POST http://localhost:3333/auth/login \
  -H "Content-Type: application/json" \
  -d '{"login": "admin1", "senha": "senha123"}'
```

2. **Usar token nas requisições**:
```bash
curl -X GET http://localhost:3333/clientes \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

### Criar um Serviço Completo

1. **Criar Cliente**:
```bash
curl -X POST http://localhost:3333/clientes \
  -H "Authorization: Bearer SEU_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "cpf": "123.456.789-00",
    "nascimento": "1990-01-01",
    "telefone": "28 99999-9999",
    "endereco": "Rua das Flores, 123"
  }'
```

2. **Criar Veículo do Cliente**:
```bash
curl -X POST http://localhost:3333/veiculoCliente \
  -H "Authorization: Bearer SEU_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "placa": "ABC1234",
    "cor": "Azul",
    "modelo": "Civic",
    "tipoDeVeiculo": "carro",
    "cliente_id": 1
  }'
```

3. **Criar Serviço**:
```bash
curl -X POST http://localhost:3333/servicos \
  -H "Authorization: Bearer SEU_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "hora_solicitacao": "2024-06-24T10:00:00Z",
    "descricao": "Reboque de veículo quebrado",
    "status": "pendente",
    "localizacao": "Rodovia BR-101, km 345",
    "tipo_servico_id": 1,
    "funcionario_id": 1,
    "veiculo_cliente_id": 1,
    "veiculo_empresa_id": 1,
    "cliente_id": 1
  }'
```

---

## 📝 Validações e Formatos

### Formatos Obrigatórios

- **CPF**: `"123.456.789-00"`
- **CNPJ**: `"12.345.678/0001-90"`
- **Telefone**: `"28 99999-9999"`
- **Data de Nascimento**: `"YYYY-MM-DD"`
- **Placa**: 7 caracteres (ABC1234)

### Campos Obrigatórios por Entidade

**Cliente**: nome, cpf, nascimento, telefone, endereco
**Empresa**: nome, cnpj, endereco, telefone
**Funcionário**: nome, cpf, nascimento, telefone, endereco, cnh, categoria_cnh
**Administrador**: nome, cpf, nascimento, login, senha
**Veículo**: placa, cor, modelo, tipo
**Serviço**: hora_solicitacao, descricao, status, localizacao, IDs relacionados

---

## 🔄 Coleção Postman

Importe o arquivo `postman/GuinchoLink-Server API.postman_collection.json` no Postman para ter acesso a todos os exemplos de requisições pré-configurados.

A coleção inclui:
- Variáveis de ambiente
- Testes automatizados
- Exemplos de todas as rotas
- Configuração automática de tokens de autenticação
