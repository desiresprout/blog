import * as dotenv from 'dotenv';
import ConnectionOptions from './cache.interface';
dotenv.config();

const config: ConnectionOptions = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  // user: process.env.REDIS_USER,
  // password: process.env.REDIS_PASSWORD,
};

export = config;
