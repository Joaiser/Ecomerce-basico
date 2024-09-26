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
    INSERT INTO Publicaciones (user_id, title, content, parent_post_id, created_at)
    VALUES (?, ?, ?, ?, NOW())
  `;
  const params = [userId, title, content, parentPostId];
  const [result] = await pool.execute(sql, params);
  return result;
}

export async function getPosts() {
  const sql = `
    SELECT p.*, c.Nickname as username FROM Publicaciones p
    JOIN clientes c ON p.user_id = c.Id_clientes
  `;
  const [rows] = await pool.execute(sql);
  for (const post of rows) {
    post.replies = await getReplies(post.id);
  }
  return rows;
}

export async function getReplies(postId) {
  const sql = `
    SELECT r.*, c.Nickname as username FROM Respuestas r
    JOIN clientes c ON r.user_id = c.Id_clientes
    WHERE r.post_id = ?
  `;
  const [rows] = await pool.execute(sql, [postId]);
  return rows;
}

export async function deletePost(postId) {
  const sql = `
    DELETE FROM Publicaciones WHERE id = ?
  `;
  const [result] = await pool.execute(sql, [postId]);
  return result;
}

export async function createReply(postId, userId, content) {
  const sql = `
    INSERT INTO Respuestas (post_id, user_id, content, created_at)
    VALUES (?, ?, ?, NOW())
  `;
  const params = [postId, userId, content];
  const [result] = await pool.execute(sql, params);
  return result;
}

export async function deleteReply(replyId) {
  const sql = `
    DELETE FROM Respuestas WHERE id = ?
  `;
  const [result] = await pool.execute(sql, [replyId]);
  return result;
}