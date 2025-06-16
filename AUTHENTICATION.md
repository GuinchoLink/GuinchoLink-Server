# Sistema de Autenticação JWT - GuinchoLink

Este sistema implementa autenticação JWT com refresh tokens para a API do GuinchoLink.

## Características

- **Access Token**: Duração de 2 horas
- **Refresh Token**: Duração de 7 dias
- Senhas criptografadas com bcrypt
- Middleware de autenticação para proteger rotas

## Endpoints de Autenticação

### Login
```
POST /auth/login
Content-Type: application/json

{
  "login": "admin",
  "senha": "admin123"
}
```

**Resposta:**
```json
{
  "message": "Login realizado com sucesso",
  "data": {
    "administrador": {
      "id": 1,
      "nome": "Administrador Padrão",
      "login": "admin"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Renovar Tokens
```
POST /auth/refresh
Content-Type: application/json

{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Logout
```
POST /auth/logout
```

## Usando as Rotas Protegidas

Para acessar qualquer rota da API (exceto as de autenticação), você deve incluir o token no header:

```
Authorization: Bearer {accessToken}
```

### Exemplo:
```
GET /clientes
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Criando um Administrador Padrão

Execute o script para criar um administrador padrão:

```bash
node src/scripts/create-admin.js
```

Isso criará um administrador com:
- **Login**: admin
- **Senha**: admin123

## Variáveis de Ambiente (Opcionais)

Você pode definir suas próprias chaves secretas:

```
JWT_ACCESS_SECRET=sua-chave-secreta-access
JWT_REFRESH_SECRET=sua-chave-secreta-refresh
```

Se não definidas, o sistema usará chaves padrão.

## Fluxo de Autenticação

1. **Login**: O cliente envia login/senha e recebe access token + refresh token
2. **Requisições**: O cliente usa o access token no header Authorization
3. **Renovação**: Quando o access token expira (2h), use o refresh token para obter novos tokens
4. **Logout**: Opcional, por enquanto apenas limpa os tokens no cliente

## Tratamento de Erros

- **401**: Token inválido, expirado ou não fornecido
- **400**: Dados de login inválidos
- **500**: Erro interno do servidor

## Segurança

- Senhas são automaticamente criptografadas antes de salvar no banco
- Tokens são assinados com chaves secretas
- Middleware verifica validade do token em cada requisição protegida
