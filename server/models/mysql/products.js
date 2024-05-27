import { createConnection } from 'mysql2/promise';

export class Product {
  static async getAll() {
    // Crear la conexión a la base de datos
    const connection = await createConnection({
      host: 'localhost',
      user: 'root',
      password: '1234',
      database: 'EcomercePC'
    });

    // Ejecutar la consulta
    const [rows] = await connection.execute('SELECT * FROM productos');

    // Cerrar la conexión a la base de datos
    await connection.end();

    return rows;
  }
}