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

export async function createPost(userId, title, content, parentPostId = null) {
  const sql = `
    INSERT INTO Publicaciones (user_id, title, content, parent_post_id)
    VALUES (?, ?, ?, ?)
  `;
  const params = [userId, title, content, parentPostId];
  const [result] = await pool.execute(sql, params);
  return result;
}

export async function getPosts() {
  const sql = `
    SELECT * FROM Publicaciones
  `;
  const [rows] = await pool.execute(sql);
  return rows;
}