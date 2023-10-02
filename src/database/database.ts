import { DataSource } from 'typeorm';
import { AccountAuthInfo } from './entity/authAccount';
import { AccountBaseInfo } from './entity/baseAccount';
import * as process from 'process';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: true,
  entities: [AccountAuthInfo, AccountBaseInfo],
  migrations: [],
  subscribers: [],
});
