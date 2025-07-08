import dotenv from 'dotenv';
import '../config/database.js';
import { Administrador } from '../models/Administrador.js';

// Carrega as variáveis de ambiente
dotenv.config();

async function createDefaultAdmin() {
  try {
    // Get admin credentials from environment variables
    const adminLogin = process.env.DEFAULT_ADMIN_LOGIN || 'admin';
    const adminSenha = process.env.DEFAULT_ADMIN_SENHA || 'admin123';
    const adminNome = process.env.DEFAULT_ADMIN_NOME || 'Administrador Padrão';
    const adminCpf = process.env.DEFAULT_ADMIN_CPF || '000.000.000-00';
    const adminNascimento = process.env.DEFAULT_ADMIN_NASCIMENTO || '1990-01-01';
    
    // Check if admin already exists
    const existingAdmin = await Administrador.findOne({ where: { login: adminLogin } });
    
    if (existingAdmin) {
      console.log('Administrador padrão já existe!');
      return;
    }
    
    // Create default admin
    const admin = await Administrador.create({
      nome: adminNome,
      cpf: adminCpf,
      nascimento: adminNascimento,
      login: adminLogin,
      senha: adminSenha
    });
    
    console.log('Administrador padrão criado com sucesso!');
    console.log(`Login: ${adminLogin}`);
    console.log('Senha: [protegida]'); // Não exibir a senha no console por segurança
    
  } catch (error) {
    console.error('Erro ao criar administrador padrão:', error.message);
  }
  
  process.exit(0);
}

createDefaultAdmin();
