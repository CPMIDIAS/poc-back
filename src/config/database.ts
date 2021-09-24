import { ConnectionOptions } from "typeorm";
import {User, Article} from '../models'

const config: ConnectionOptions = {
  type: "postgres",
  host: process.env.POSTGRES_HOST || "localhost",
  port: Number(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER || "postgres",
  password: process.env.POSTGRES_PASSWORD || "postgres",
  database: process.env.POSTGRES_DB || "poc-back-db",
  entities: [User, Article],
  synchronize: true,
};

export default config;
