import { Cliente } from "../clientes/Cliente.entity";
import * as fs from "fs";
import * as path from "path";
import csv from "csv-parser";
import * as dotenv from "dotenv";
import "reflect-metadata";
import { AppDataSource, resetClientes } from "../config/database";

dotenv.config();

/**
 * Procesa un archivo CSV de clientes y los importa en la base de datos en lotes.
 * 
 * Esta función utiliza un flujo de lectura (`fs.createReadStream`) para procesar un archivo CSV
 * ubicado en la carpeta `./clientes` dentro del directorio actual. Los datos se leen fila por fila
 * y se almacenan en un arreglo de objetos `Cliente`. Una vez que se han leído todos los datos,
 * se insertan en la base de datos en lotes de tamaño configurable.
 * 
 * ### Proceso detallado:
 * 1. Se inicializa un arreglo vacío `registros` para almacenar los datos leídos del archivo CSV.
 * 2. Se utiliza `fs.createReadStream` para leer el archivo `clientes.csv` y se conecta a un flujo
 *    de procesamiento CSV (`csv()`).
 * 3. Cada fila del archivo CSV se convierte en un objeto `Cliente` y se agrega al arreglo `registros`.
 * 4. Una vez que se han leído todas las filas (`on("end")`), se divide el arreglo `registros` en
 *    lotes de tamaño `batchSize` (por defecto, 5000).
 * 5. Cada lote se inserta en la base de datos utilizando el método `createQueryBuilder` de TypeORM.
 * 6. Al finalizar la importación, se imprime en consola el tiempo total de ejecución y se finaliza
 *    el proceso con `process.exit(0)`.
 * 
 * ### Consideraciones:
 * - El tamaño del lote (`batchSize`) está configurado en 5000 registros por inserción para optimizar
 *   el rendimiento y evitar problemas de memoria o tiempo de espera en la base de datos.
 * - La función utiliza `async/await` para garantizar que las inserciones en la base de datos se
 *   completen antes de continuar con el siguiente lote.
 * - Se mide el tiempo total de ejecución desde el inicio de la función hasta la finalización de la
 *   importación para proporcionar métricas de rendimiento.
 * 
 * ### Requisitos:
 * - El archivo `clientes.csv` debe estar ubicado en la carpeta `./clientes` dentro del directorio
 *   actual del proyecto.
 * - La estructura del archivo CSV debe coincidir con la definición del modelo `Cliente`.
 * - La conexión a la base de datos debe estar configurada correctamente en `AppDataSource`.
 * 
 * @async
 * @function batchEstrategy
 * @returns {Promise<void>} No retorna ningún valor, pero finaliza el proceso al completar la importación.
 * 
 * @example
 * // Ejecución de la función para importar clientes desde un archivo CSV:
 * batchEstrategy()
 *   .then(() => console.log("Importación completada"))
 *   .catch((error) => console.error("Error durante la importación:", error));
 */
export async function batchEstrategy(): Promise<void> {
    const registros: Cliente[] = [];
    const start = Date.now();
    await AppDataSource.initialize();
    await resetClientes();

    await new Promise<void>((resolve, reject) => {
        fs.createReadStream(path.join(__dirname, "../clientes/clientes.csv"))
            .pipe(csv({ separator: ";" }))
            .on("data", (row) => {
                registros.push(row as Cliente);
            })
            .on("end", () => {
                console.log("Archivo CSV procesado");
                resolve();
            })
            .on("error", (err) => {
                console.error("Error al leer el CSV:", err);
                reject(err);
            });
    });

    console.log("CSV cargado, importando a la base de datos...");
    const batchSize = 4095;
    for (let i = 0; i < registros.length; i += batchSize) {
        const batch = registros.slice(i, i + batchSize);
        await AppDataSource.createQueryBuilder()
            .insert()
            .into(Cliente)
            .values(batch)
            .execute();
        console.log(`Lote ${i} a ${i + batch.length} insertado.`);
    }

    console.log(`Importación completa en ${(Date.now() - start) / 1000} segundos.`);
    process.exit(0);
}
