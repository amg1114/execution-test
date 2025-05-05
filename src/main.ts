import { batchEstrategy } from './métodos/batch.strategy';
import { copyStrategy } from './métodos/copyload';
import { lineByLineStrategy } from './métodos/lineByLine';

const main = async () => {
  const estrategia = process.argv[2];

  switch (estrategia) {
    case 'batch':
      await batchEstrategy();
      break;
    case 'copy':
      await copyStrategy();
      break;
    case 'line':
      await lineByLineStrategy();
      break;
    default:
      console.log('Estrategia inválida. Usa: batch | copy | line');
  }
};

main();
