import * as process from 'process';

export default () => ({
  Database: {
    name: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
  },
});