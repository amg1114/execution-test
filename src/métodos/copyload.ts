import { Client } from 'pg';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { from } from 'pg-copy-streams';

dotenv.config();

export async function copyStrategy() {
  const start = Date.now();

  const client = new Client({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  try {
    await client.connect();

    // Limpia la tabla antes de cargar
    await client.query('DELETE FROM cliente');

    const filePath = path.resolve(__dirname, '../clientes/clientes.csv');

    const copyStream = client.query(from(`
      COPY cliente(
        "id", "genero", "edad", "nivelAcademico", "estrato", "ciudad",
        "cantHijos", "numSalarios", "pensiondado", "tipoTarjeta", "deseaTarjeta",
        "cantArticulos", "articuloMasComprado", "mesDeMasCompras",
        "compraEnQuincena", "artiucloMasDeseado"
      )
      FROM STDIN
      WITH (FORMAT csv, DELIMITER ';', HEADER true)
    `));

    const fileStream = fs.createReadStream(filePath);

    await new Promise<void>((resolve, reject) => {
      fileStream
        .pipe(copyStream)
        .on('finish', () => {
          console.log(`✅ COPY completado en ${(Date.now() - start) / 1000} segundos`);
          resolve();
        })
        .on('error', (err) => {
          console.error('Error durante COPY STDIN:', err);
          reject(err);
        });
    });

  } catch (error) {
    console.error('Error en copyStrategy:', error);
  } finally {
    await client.end();
  }
}
