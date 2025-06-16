import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { JWT_CONFIG } from '../config/jwt-config.js';
import { Administrador } from '../models/Administrador.js';

class AuthService {
  
  static generateTokens(payload) {
    const accessToken = jwt.sign(payload, JWT_CONFIG.access.secret, {
      expiresIn: JWT_CONFIG.access.expiresIn
    });
    
    const refreshToken = jwt.sign(payload, JWT_CONFIG.refresh.secret, {
      expiresIn: JWT_CONFIG.refresh.expiresIn
    });
    
    return { accessToken, refreshToken };
  }
  
  static verifyAccessToken(token) {
    try {
      return jwt.verify(token, JWT_CONFIG.access.secret);
    } catch (error) {
      throw new Error('Token inválido ou expirado');
    }
  }
  
  static verifyRefreshToken(token) {
    try {
      return jwt.verify(token, JWT_CONFIG.refresh.secret);
    } catch (error) {
      throw new Error('Refresh token inválido ou expirado');
    }
  }
  
  static async login(login, senha) {
    // Buscar administrador pelo login
    const administrador = await Administrador.findOne({ where: { login } });
    
    if (!administrador) {
      throw new Error('Credenciais inválidas');
    }
    
    // Verificar senha
    const senhaValida = await bcrypt.compare(senha, administrador.senha);
    if (!senhaValida) {
      throw new Error('Credenciais inválidas');
    }
    
    // Gerar tokens
    const payload = {
      id: administrador.id,
      login: administrador.login,
      nome: administrador.nome
    };
    
    const tokens = this.generateTokens(payload);
    
    return {
      administrador: {
        id: administrador.id,
        nome: administrador.nome,
        login: administrador.login
      },
      ...tokens
    };
  }
  
  static async refreshTokens(refreshToken) {
    try {
      const decoded = this.verifyRefreshToken(refreshToken);
      
      // Verificar se o administrador ainda existe
      const administrador = await Administrador.findByPk(decoded.id);
      if (!administrador) {
        throw new Error('Administrador não encontrado');
      }
      
      // Gerar novos tokens
      const payload = {
        id: administrador.id,
        login: administrador.login,
        nome: administrador.nome
      };
      
      return this.generateTokens(payload);
    } catch (error) {
      throw new Error('Refresh token inválido');
    }
  }
}

export { AuthService };
