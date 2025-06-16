import { AuthService } from '../services/AuthService.js';

class AuthController {
  
  static async login(req, res) {
    try {
      const { login, senha } = req.body;
      
      if (!login || !senha) {
        return res.status(400).json({ 
          error: 'Login e senha são obrigatórios' 
        });
      }
      
      const result = await AuthService.login(login, senha);
      
      res.json({
        message: 'Login realizado com sucesso',
        data: result
      });
    } catch (error) {
      res.status(401).json({ 
        error: error.message 
      });
    }
  }
  
  static async refresh(req, res) {
    try {
      const { refreshToken } = req.body;
      
      if (!refreshToken) {
        return res.status(400).json({ 
          error: 'Refresh token é obrigatório' 
        });
      }
      
      const tokens = await AuthService.refreshTokens(refreshToken);
      
      res.json({
        message: 'Tokens renovados com sucesso',
        data: tokens
      });
    } catch (error) {
      res.status(401).json({ 
        error: error.message 
      });
    }
  }
  
  static async logout(req, res) {
    // Para um logout completo, você poderia implementar uma blacklist de tokens
    // Por enquanto, apenas retornamos sucesso
    res.json({
      message: 'Logout realizado com sucesso'
    });
  }
}

export { AuthController };
