import * as dotenv from 'dotenv';

dotenv.config();

const config = {
  DATABASE_PORT: parseInt(String(process.env.DATABASE_PORT), 10) || 5432,
  SERVER_PORT: parseInt(String(process.env.SERVER_PORT), 10) || 3333,
  DATABASE_HOST: process.env.DATABASE_HOST || 'localhost',
  DATABASE_USER: process.env.DATABASE_USER || 'postgres',
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
  DATABASE_NAME: process.env.DATABASE_NAME
};

export { config };
