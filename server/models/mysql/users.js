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


class User {
    static async createUser(Nickname, Password_clientes, users_correo) {
        try {
          const [result] = await pool.execute(
            'INSERT INTO clientes (Nickname, Password_clientes, users_correo) VALUES (?, ?, ?)', 
            [Nickname, Password_clientes, users_correo]
          );
          return result.insertId;
        } catch (err) {
            console.error(err);
            throw new Error('Hubo un error al crear el usuario: ' + err.message);
          }
    }

    static async getUserByNickname(Nickname) {
        try {
          const [rows] = await pool.execute(
            'SELECT * FROM clientes WHERE Nickname = ?', 
            [Nickname]
          );
          return rows[0];
        } catch (err) {
            console.error(err);
            throw new Error('Hubo un error al buscar el usuario: ' + err.message);
          }
      }
}
export default User;