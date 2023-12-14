require('dotenv').config()
const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE, CONNECT_TIMEOUT } = process.env;
const config = {
    db: {
      /* don't expose password or any sensitive info, done only for demo */
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_DATABASE,
      connectTimeout: CONNECT_TIMEOUT,
      namedPlaceholders: true
    },
    listPerPage: 10,
    corsOptions: {
      origin: "http://localhost:3000",
      credentials: true,
    }
  };
  
 module.exports = config;