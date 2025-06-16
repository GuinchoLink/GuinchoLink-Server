import '../config/database.js';
import { Administrador } from '../models/Administrador.js';

async function createDefaultAdmin() {
  try {
    // Check if admin already exists
    const existingAdmin = await Administrador.findOne({ where: { login: 'admin' } });
    
    if (existingAdmin) {
      console.log('Administrador padrão já existe!');
      return;
    }
    
    // Create default admin
    const admin = await Administrador.create({
      nome: 'Administrador Padrão',
      cpf: '000.000.000-00',
      nascimento: '1990-01-01',
      login: 'admin',
      senha: 'admin123'
    });
    
    console.log('Administrador padrão criado com sucesso!');
    console.log('Login: admin');
    console.log('Senha: admin123');
    
  } catch (error) {
    console.error('Erro ao criar administrador padrão:', error.message);
  }
  
  process.exit(0);
}

createDefaultAdmin();
