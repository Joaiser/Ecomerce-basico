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

export class Contact {
  static async getAllMessages() {
    try {
      const [rows] = await pool.execute('SELECT * FROM contacto');
      return rows;
    } catch (err) {
      throw new Error('Hubo un error al obtener todos los mensajes');
    }
  }

  static async getById(id) {
    try {
      const [rows] = await pool.execute('SELECT * FROM contacto WHERE id = ?', [id]);
      return rows[0] || null;
    } catch (err) {
      throw new Error('Hubo un error al obtener el mensaje por ID');
    }
  }

  static async sendMessage(nickname, email, message) {
    try {
        const [result] = await pool.execute('INSERT INTO contacto (nickname, email, message) VALUES (?, ?, ?)', [nickname, email, message]);
        return result;
    } catch (err) {
        throw err;
    }
  }
}