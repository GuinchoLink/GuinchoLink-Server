// // Configuração do banco de dados no ambiente de teste
//  export const databaseConfig = {
  //  dialect: 'sqlite',
  //  storage: 'database.sqlite',
  //  define: {
    //  timestamps: true,
    //  freezeTableName: true,
    //  underscored: true
  //  }
//  };


// // Configuração do banco de dados no ambiente de desenvolvimento
// export const databaseConfig = {
//   dialect: 'postgres',
//   host: 'localhost',
//   username: 'postgres',
//   password: 'bd',
//   database: 'guincho-link',
//   define: {
//     timestamps: true,
//     freezeTableName: true,
//     underscored: true
//   }
// };

// Configuração do banco de dados no ambiente de produção
export const databaseConfig = {
  dialect: 'postgres',
  host: 'dpg-d11df3re5dus738l9dk0-a.oregon-postgres.render.com',
  username: 'guincho_link_user',
  password: 'mQcmT8oC34l9ncpn9VNRJsutqXIOLrZk',
  database: 'guincho_link',
  define: {
    timestamps: true,
    freezeTableName: true,
    underscored: true
  },
  dialectOptions: {
    ssl: false
  }
};


/*
// Configuração do banco de dados no ambiente de produção
export const databaseConfig = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'postgres',
  database: 'scv-backend-node-sequelize',
  define: {
    timestamps: true,
    freezeTableName: true,
    underscored: true
  }
};
*/