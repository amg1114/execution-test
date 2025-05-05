import * as fs from 'fs';
import * as readline from 'readline';
import * as path from 'path';
import { AppDataSource, resetClientes } from '../config/database';
import { Cliente } from '../clientes/Cliente.entity';

export async function lineByLineStrategy() {
    const start = Date.now();
    await AppDataSource.initialize();
    await resetClientes();
    const repo = AppDataSource.getRepository(Cliente);

    const rl = readline.createInterface({
        input: fs.createReadStream(path.resolve(__dirname, '../clientes/clientes.csv')),
        crlfDelay: Infinity,
    });

    let isFirst = true;
    let count = 0;

    for await (const line of rl) {
        if (isFirst) {
            isFirst = false;
            continue;
        }
        const fields = line.split(';');

        const cliente = repo.create({
            id: fields[0],
            genero: fields[1],
            edad: fields[2],
            nivelAcademico: fields[3],
            estrato: fields[4],
            ciudad: fields[5],
            cantHijos: fields[6],
            numSalarios: fields[7],
            pensiondado: fields[8],
            tipoTarjeta: fields[9],
            deseaTarjeta: fields[10],
            cantArticulos: fields[11],
            articuloMasComprado: fields[12],
            mesDeMasCompras: fields[13],
            compraEnQuincena: fields[14],
            artiucloMasDeseado: fields[15],
        });

        await repo.save(cliente);
        count++;

        if (count % 1000 === 0) {
            console.log(`Insertados ${count} registros...`);
        }
    }

    console.log(`Línea por línea ejecutado en ${(Date.now() - start) / 1000} segundos`);
    console.log(`Total de registros insertados: ${count}`);
    await AppDataSource.destroy();
}
