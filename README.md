¡Claro! A continuación, te presento un ejemplo de un archivo `README.md` para el proyecto [execution-test](https://github.com/amg1114/execution-test). Este archivo está diseñado para proporcionar una descripción clara del propósito del proyecto, instrucciones de configuración y uso, así como detalles sobre la estructura del código y las tecnologías utilizadas.

---

# execution-test

**execution-test** es una herramienta de línea de comandos desarrollada en TypeScript que permite importar registros de clientes desde un archivo CSV a una base de datos PostgreSQL utilizando TypeORM. El proyecto está optimizado para manejar grandes volúmenes de datos mediante estrategias de procesamiento por lotes.

## 🚀 Características

* **Importación desde CSV**: Lee archivos CSV con separadores personalizados para importar datos de clientes.
* **Procesamiento por lotes**: Inserta registros en la base de datos en lotes configurables para mejorar el rendimiento.
* **Configuración flexible**: Utiliza variables de entorno para configurar la conexión a la base de datos y otros parámetros.
* **Manejo de errores**: Captura y muestra errores durante el proceso de importación para facilitar la depuración.

## 📦 Instalación

1. **Clonar el repositorio**

   ```bash
   git clone https://github.com/amg1114/execution-test.git
   cd execution-test
   ```

2. **Instalar dependencias**

   ```bash
   npm install
   ```

3. **Configurar variables de entorno**

   Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=tu_usuario
   DB_PASSWORD=tu_contraseña
   DB_NAME=nombre_de_tu_base_de_datos
   ```

4. **Preparar el archivo CSV**

   Asegúrate de que el archivo `clientes.csv` se encuentre en la ruta `./clientes/clientes.csv` y que utilice el punto y coma (`;`) como separador de campos.

## 🛠️ Uso

Para ejecutar la importación de clientes desde el archivo CSV, utiliza el siguiente comando:

```bash
npm start
```

Este comando iniciará el proceso de lectura del archivo CSV y la inserción de los registros en la base de datos en lotes de 5000 registros por defecto.

## 🧪 Estructura del Proyecto

* `clientes/Cliente.entity.ts`: Define la entidad `Cliente` utilizada por TypeORM.
* `clientes/clientes.csv`: Archivo CSV con los datos de los clientes a importar.
* `src/index.ts`: Punto de entrada principal del proyecto que inicializa la conexión a la base de datos y ejecuta la estrategia de importación.
* `src/batchStrategy.ts`: Implementa la lógica de procesamiento por lotes para la importación de datos.

## ⚙️ Tecnologías Utilizadas

* [TypeScript](https://www.typescriptlang.org/)
* [Node.js](https://nodejs.org/)
* [TypeORM](https://typeorm.io/)
* [PostgreSQL](https://www.postgresql.org/)
* [dotenv](https://www.npmjs.com/package/dotenv)
* [csv-parser](https://www.npmjs.com/package/csv-parser)

## 🐞 Problemas Conocidos

* **Límite de parámetros en PostgreSQL**: Al intentar insertar más de 4095 registros en una sola operación, PostgreSQL puede generar un error relacionado con el número de parámetros. Se recomienda mantener el tamaño de los lotes por debajo de este límite.

## 📄 Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo [LICENSE](./LICENSE) para más detalles.

---

Espero que este archivo `README.md` te sea útil para documentar y compartir tu proyecto. Si necesitas asistencia adicional o tienes preguntas específicas sobre la implementación, no dudes en consultarme.
