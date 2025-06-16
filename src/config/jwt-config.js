export const JWT_CONFIG = {
  access: {
    secret: process.env.JWT_ACCESS_SECRET || 'guincholink-access-secret-key-2024',
    expiresIn: '2h'
  },
  refresh: {
    secret: process.env.JWT_REFRESH_SECRET || 'guincholink-refresh-secret-key-2024',
    expiresIn: '7d'
  }
};
