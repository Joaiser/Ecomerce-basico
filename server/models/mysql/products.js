import { createPool } from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

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

  static async getById(id) {
    const [rows] = await pool.execute('SELECT * FROM products WHERE id = ?', [id]);
    return rows[0] || null;
  }

  static async getByGender(gender) {
    const [rows] = await pool.execute('SELECT * FROM products WHERE gender = ?', [gender]);
    return rows;
  }
}
