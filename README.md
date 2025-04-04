# GuinchoLink-Server

GuinchoLink-Server é uma API desenvolvida para gerenciar o sistema de guinchos, permitindo o cadastro, consulta, atualização e exclusão de clientes, empresas, veículos e serviços. Este projeto foi construído utilizando Node.js e Express, com integração a um banco de dados relacional.

## 📋 Funcionalidades

- Gerenciamento de **Clientes**.
- Gerenciamento de **Empresas**.
- Gerenciamento de **Funcionários**.
- Gerenciamento de **Veículos de Clientes** e **Veículos de Empresas**.
- Gerenciamento de **Tipos de Serviços** e **Serviços**.

---

## 🚀 Tecnologias Utilizadas

- **Node.js**: Ambiente de execução para JavaScript.
- **Express**: Framework para construção de APIs.
- **Sequelize**: ORM para interação com o banco de dados.
- **Postman**: Testes de API.

---

## 📦 Instalação e Configuração

### Pré-requisitos

Certifique-se de ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [Git](https://git-scm.com/)

### Passo a passo

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/WelingtonGulinelli/GuinchoLink-Server.git
   cd GuinchoLink-Server
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```


3. **Inicie o servidor**:
   ```bash
   npm run dev
   ```

4. O servidor estará rodando em `http://localhost:3333`.

---

## 📚 Rotas da API

### Clientes

- **GET** `/clientes` - Retorna todos os clientes.
- **GET** `/clientes/:id` - Retorna um cliente pelo ID.
- **POST** `/clientes` - Cria um novo cliente.
- **PUT** `/clientes/:id` - Atualiza um cliente pelo ID.
- **DELETE** `/clientes/:id` - Exclui um cliente pelo ID.

### Empresas

- **GET** `/empresa` - Retorna todas as empresas.
- **GET** `/empresa/:id` - Retorna uma empresa pelo ID.
- **POST** `/empresa` - Cria uma nova empresa.
- **PUT** `/empresa/:id` - Atualiza uma empresa pelo ID.
- **DELETE** `/empresa/:id` - Exclui uma empresa pelo ID.

### Funcionários

- **GET** `/funcionario` - Retorna todos os funcionários.
- **GET** `/funcionario/:id` - Retorna um funcionário pelo ID.
- **POST** `/funcionario` - Cria um novo funcionário.
- **PUT** `/funcionario/:id` - Atualiza um funcionário pelo ID.
- **DELETE** `/funcionario/:id` - Exclui um funcionário pelo ID.

### Veículos de Clientes

- **GET** `/veiculoCliente` - Retorna todos os veículos de clientes.
- **GET** `/veiculoCliente/:id` - Retorna um veículo de cliente pelo ID.
- **POST** `/veiculoCliente` - Cria um novo veículo de cliente.
- **PUT** `/veiculoCliente/:id` - Atualiza um veículo de cliente pelo ID.
- **DELETE** `/veiculoCliente/:id` - Exclui um veículo de cliente pelo ID.

### Veículos de Empresas

- **GET** `/veiculoEmpresa` - Retorna todos os veículos de empresas.
- **GET** `/veiculoEmpresa/:id` - Retorna um veículo de empresa pelo ID.
- **POST** `/veiculoEmpresa` - Cria um novo veículo de empresa.
- **PUT** `/veiculoEmpresa/:id` - Atualiza um veículo de empresa pelo ID.
- **DELETE** `/veiculoEmpresa/:id` - Exclui um veículo de empresa pelo ID.

### Tipos de Serviços

- **GET** `/tipos-servico` - Retorna todos os tipos de serviços.
- **GET** `/tipos-servico/:id` - Retorna um tipo de serviço pelo ID.
- **POST** `/tipos-servico` - Cria um novo tipo de serviço.
- **PUT** `/tipos-servico/:id` - Atualiza um tipo de serviço pelo ID.
- **DELETE** `/tipos-servico/:id` - Exclui um tipo de serviço pelo ID.

### Serviços

- **GET** `/servicos` - Retorna todos os serviços.
- **GET** `/servicos/:id` - Retorna um serviço pelo ID.
- **POST** `/servicos` - Cria um novo serviço.
- **PUT** `/servicos/:id` - Atualiza um serviço pelo ID.
- **DELETE** `/servicos/:id` - Exclui um serviço pelo ID.

---


