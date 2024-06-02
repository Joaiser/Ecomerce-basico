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

export class Contest {
  static async getAllContestants() {
    try {
      const [rows] = await pool.execute('SELECT * FROM Contest');
      return rows;
    } catch (err) {
      throw new Error('Hubo un error al obtener todos los concursantes');
    }
  }

  static async getById(id) {
    try {
      const [rows] = await pool.execute('SELECT * FROM Contest WHERE id = ?', [id]);
      return rows[0] || null;
    } catch (err) {
      throw new Error('Hubo un error al obtener el concursante por ID');
    }
  }

  static async register(username) {
    try {
        const [rows] = await pool.execute('SELECT * FROM Contest WHERE username = ?', [username]);
        if (rows.length > 0) {
            throw new Error('El nombre de usuario ya está registrado en el concurso');
        }
        const [result] = await pool.execute('INSERT INTO Contest (username) VALUES (?)', [username]);
        return result;
    } catch (err) {
        throw err;
    }
}
}