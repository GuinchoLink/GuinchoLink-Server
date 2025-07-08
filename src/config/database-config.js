import dotenv from 'dotenv';

// Carrega as variáveis de ambiente
dotenv.config();

// Configuração do banco de dados usando variáveis de ambiente
export const databaseConfig = {
  dialect: process.env.DB_DIALECT || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_DATABASE || 'guincho-link',
  define: {
    timestamps: true,
    freezeTableName: true,
    underscored: true
  },
  dialectOptions: {
    ssl: process.env.DB_SSL === 'true'
  }
};