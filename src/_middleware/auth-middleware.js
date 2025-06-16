import { AuthService } from '../services/AuthService.js';

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({ 
        error: 'Token de acesso não fornecido' 
      });
    }
    
    const token = authHeader.split(' ')[1]; // Remove "Bearer "
    
    if (!token) {
      return res.status(401).json({ 
        error: 'Token de acesso malformado' 
      });
    }
    
    const decoded = AuthService.verifyAccessToken(token);
    req.user = decoded;
    
    next();
  } catch (error) {
    return res.status(401).json({ 
      error: 'Token inválido ou expirado' 
    });
  }
};

export { authMiddleware };
