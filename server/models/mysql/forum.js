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
  try {
      const [result] = await pool.execute(sql, params);
      console.log('SQL Query:', sql); // Agregar log de la consulta SQL
      console.log('Params:', params); // Agregar log de los parámetros
      return result;
  } catch (error) {
      console.error('Error en createPost:', error); // Agregar log de error
      throw error;
  }
}

export async function getPosts() {
  const sqlPosts = `
      SELECT p.id, p.title, p.content, p.created_at, 
             COALESCE(c.Nickname, a.username) as username
      FROM Publicaciones p
      LEFT JOIN clientes c ON p.user_id = c.Id_clientes
      LEFT JOIN administradores a ON p.user_id = a.id
      ORDER BY p.created_at DESC
  `;
  
  const sqlReplies = `
      SELECT r.id, r.post_id, r.content, r.created_at, 
             COALESCE(c.Nickname, a.username) as username
      FROM Respuestas r
      LEFT JOIN clientes c ON r.user_id = c.Id_clientes
      LEFT JOIN administradores a ON r.user_id = a.id
      ORDER BY r.created_at ASC
  `;
  
  try {
      const [posts] = await pool.execute(sqlPosts);
      const [replies] = await pool.execute(sqlReplies);
      
      // Agrupar respuestas por post_id
      const repliesByPostId = replies.reduce((acc, reply) => {
          if (!acc[reply.post_id]) {
              acc[reply.post_id] = [];
          }
          acc[reply.post_id].push(reply);
          return acc;
      }, {});
      
      // Añadir respuestas a las publicaciones correspondientes
      const postsWithReplies = posts.map(post => ({
          ...post,
          replies: repliesByPostId[post.id] || []
      }));
      
      return postsWithReplies;
  } catch (error) {
      console.error('Error en getPosts:', error); // Agregar log de error
      throw error;
  }
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

export async function getUserIdByUsername(username) {
  const sqlClientes = `
      SELECT Id_clientes as id FROM clientes WHERE Nickname = ?
  `;
  const sqlAdministradores = `
      SELECT id FROM administradores WHERE username = ?
  `;
  
  try {
      // Buscar en la tabla clientes
      const [rowsClientes] = await pool.execute(sqlClientes, [username]);
      if (rowsClientes.length > 0) {
          return rowsClientes[0].id;
      }

      // Buscar en la tabla administradores
      const [rowsAdministradores] = await pool.execute(sqlAdministradores, [username]);
      if (rowsAdministradores.length > 0) {
          return rowsAdministradores[0].id;
      }

      // Si no se encuentra en ninguna tabla, lanzar un error
      throw new Error('Usuario no encontrado');
  } catch (error) {
      console.error('Error en getUserIdByUsername:', error); // Agregar log de error
      throw error;
  }
}

export async function deleteRepliesByPostId(postId) {
  const sql = `
      DELETE FROM Respuestas WHERE post_id = ?
  `;
  const [result] = await pool.execute(sql, [postId]);
  return result;
}

export async function getIdPost(postId) {
  const sql = `
      SELECT * FROM Publicaciones Where id = ?
  `;
  const [rows] = await pool.execute(sql, [postId]);
  return rows[0];
}