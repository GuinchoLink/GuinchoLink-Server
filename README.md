# GuinchoLink-Server

GuinchoLink-Server é uma API desenvolvida para gerenciar o sistema de guinchos, permitindo o cadastro, consulta, atualização e exclusão de clientes, empresas, veículos e serviços. Este projeto foi construído utilizando Node.js e Express, com integração a um banco de dados relacional.

## 📋 Funcionalidades

- **Sistema de Autenticação JWT** - Login, logout e refresh de tokens
- Gerenciamento de **Clientes** - CRUD completo
- Gerenciamento de **Empresas** - CRUD completo
- Gerenciamento de **Funcionários** - CRUD completo
- Gerenciamento de **Administradores** - CRUD completo
- Gerenciamento de **Veículos de Clientes** e **Veículos de Empresas** - CRUD completo
- Gerenciamento de **Tipos de Serviços** e **Serviços** - CRUD completo
- **Sistema de Finalização de Serviços** com cálculo automático de descontos
- **Sistema de Feedback** dos clientes
- **Regras de Negócio** implementadas para controle de serviços e descontos

---

## 🚀 Tecnologias e Ferramentas Utilizadas

### Backend
- **Node.js v16+**: Ambiente de execução JavaScript
- **Express v4.21.2**: Framework web para APIs REST
- **Sequelize v6.37.7**: ORM para interação com banco de dados
- **SQLite3 v5.1.4**: Banco de dados para desenvolvimento
- **PostgreSQL (pg v8.16.0)**: Banco de dados para produção

### Autenticação e Segurança
- **JWT (jsonwebtoken v9.0.2)**: Sistema de autenticação por tokens
- **BCrypt v6.0.0**: Hash de senhas
- **BCryptjs v3.0.2**: Alternativa para hash de senhas

### Desenvolvimento
- **Nodemon v3.1.10**: Reinicialização automática durante desenvolvimento
- **CORS**: Configuração para requisições cross-origin

### Testes de API
- **Postman**: Coleção de testes disponível em `/postman/`

### Onde Cada Tecnologia é Utilizada

**Express**:
- `src/server.js` - Configuração principal do servidor
- `src/routes.js` - Definição de todas as rotas da API
- Todos os controllers em `src/controllers/`

**Sequelize**:
- `src/config/database.js` - Configuração e inicialização do banco
- `src/config/database-config.js` - Configurações específicas do banco
- `src/models/` - Todos os modelos de dados (11 modelos)

**JWT**:
- `src/config/jwt-config.js` - Configurações de tokens
- `src/services/AuthService.js` - Lógica de autenticação
- `src/_middleware/auth-middleware.js` - Middleware de autenticação

**BCrypt**:
- `src/models/Administrador.js` - Hash de senhas de administradores
- Hooks do Sequelize para criptografia automática

---

## 📦 Instalação e Configuração

### Pré-requisitos

Certifique-se de ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) (versão 16 ou superior)
- [Git](https://git-scm.com/)
- PostgreSQL (para produção) ou SQLite (para desenvolvimento)

### Passo a passo

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/GuinchoLink/GuinchoLink-Server.git
   cd GuinchoLink-Server
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Configure o banco de dados**:
   - Para desenvolvimento: O SQLite será criado automaticamente
   - Para produção: Configure as variáveis de ambiente no arquivo `src/config/database-config.js`

4. **Inicie o servidor**:
   ```bash
   npm run dev
   ```


5. O servidor estará rodando em `http://localhost:3333`.

---

## 🏗️ Arquitetura do Projeto

O projeto segue uma arquitetura em camadas bem definida:

```
src/
├── config/           # Configurações do banco e JWT
├── controllers/      # Controladores (11 controllers)
├── models/          # Modelos de dados (11 modelos)
├── services/        # Lógica de negócio (11 services)
├── _middleware/     # Middlewares de autenticação e erro
├── scripts/         # Scripts utilitários
├── routes.js        # Definição das rotas
└── server.js        # Configuração principal
```

### Modelos de Dados
- **Cliente** - Clientes do sistema
- **Empresa** - Dados da empresa de guincho
- **Funcionário** - Funcionários da empresa
- **Administrador** - Administradores do sistema
- **VeiculoCliente** - Veículos dos clientes
- **VeiculoEmpresa** - Veículos da empresa
- **TipoServico** - Tipos de serviços oferecidos
- **Servico** - Ordens de serviço
- **FimServico** - Finalizações de serviços
- **Feedback** - Avaliações dos clientes

---

## 🔐 Sistema de Autenticação

O sistema utiliza **JWT (JSON Web Token)** para autenticação:

- **Access Token**: Válido por 2 horas
- **Refresh Token**: Válido por 7 dias
- **Middleware de Autenticação**: Protege rotas sensíveis
- **Hash de Senhas**: BCrypt para administradores

### Rotas Públicas
- `POST /auth/login` - Login
- `POST /auth/refresh` - Renovar token
- `POST /auth/logout` - Logout

---

## 🎯 Regras de Negócio Implementadas

1. **Limite de Serviços por Dia**: Máximo de 3 serviços cadastrados por dia
2. **Controle de Funcionários**: Um funcionário não pode ter mais de um serviço pendente
3. **Desconto Automático**: Clientes com 3+ serviços finalizados no mês ganham 10% de desconto
4. **Validações Rigorosas**: CPF, CNPJ, telefones e datas seguem padrões específicos
5. **Status de Veículos**: Controle de disponibilidade dos veículos da empresa

---

## 📚 Documentação da API

Para documentação completa de todas as rotas, endpoints e exemplos de uso, consulte:
**[README-api.md](./README-api.md)**

Resumo das principais rotas:
- **Autenticação**: `/auth/*`
- **Clientes**: `/clientes/*`
- **Empresas**: `/empresa/*`  
- **Funcionários**: `/funcionario/*`
- **Administradores**: `/administrador/*`
- **Veículos**: `/veiculoCliente/*` e `/veiculoEmpresa/*`
- **Serviços**: `/servicos/*` e `/tipos-servico/*`
- **Finalizações**: `/fim-servicos/*`
- **Feedback**: `/feedback/*`

---

## 🧪 Testes

O projeto inclui uma coleção do Postman para testes:
- Arquivo: `postman/GuinchoLink-Server API.postman_collection.json`
- Importe no Postman para testar todas as rotas
- Inclui exemplos de requisições e respostas

---

## 👥 Contribuidores

- **Welington Gulinelli** - Administrador, Funcionário e  Servico
- **Leandro Carvalho** - Cliente, Veículo do Cliente e Feedback 
- **Eduardo Almeida** - Veiculo da Empresa, Empresa, TipoServico e Fim Servico

---

## 🚀 Deploy e Produção

### Variáveis de Ambiente Recomendadas
```
JWT_ACCESS_SECRET=sua-chave-secreta-access
JWT_REFRESH_SECRET=sua-chave-secreta-refresh
DATABASE_URL=sua-string-conexao-postgresql
NODE_ENV=production
PORT=3333
```

---


**Desenvolvido pela equipe GuinchoLink**


