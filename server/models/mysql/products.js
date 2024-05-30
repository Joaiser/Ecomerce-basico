import { createPool } from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

//es pool porque se va a estar haciendo varias consultas a la base de datos
const pool = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  supportBigNumbers: true,
  bigNumberStrings: true
});

export class Product {
  static async getAllProducts() {
    const [rows] = await pool.execute('SELECT * FROM products');
    return rows;
  }

  static async getById(Id_producto) {
    const [rows] = await pool.execute('SELECT * FROM products WHERE Id_producto = ?', [Id_producto]);
    return rows[0] || null;
  }

  static async getByGender(Genero) {
    const [rows] = await pool.execute('SELECT * FROM products WHERE Genero = ?', [Genero]);
    return rows;
  }
}
