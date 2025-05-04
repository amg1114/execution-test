import { DataSource } from "typeorm";
import { Cliente } from "./clientes/Cliente.entity";

import * as dotenv from "dotenv";
dotenv.config();

const AppDataSource = new DataSource({
  type: "postgres", // o mysql/sqlite
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Cliente],
  synchronize: true,
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });