import { DataSource } from "typeorm";
import { Cliente } from "../clientes/Cliente.entity";
import * as dotenv from "dotenv"

dotenv.config()

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Cliente],
  synchronize: true,
});


export async function resetClientes(): Promise<void> {
  try {
    await AppDataSource.query("TRUNCATE TABLE cliente RESTART IDENTITY CASCADE");
    console.log("Tabla 'cliente' reiniciada correctamente.");
  } catch (error) {
    console.error("Error al limpiar la tabla 'cliente':", error);
    throw error;
  }
}
