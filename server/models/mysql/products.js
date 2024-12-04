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
    try {
      const [rows] = await pool.execute('SELECT * FROM products');
      return rows;
    } catch (err) {
      throw new Error('Hubo un error al obtener todos los productos');
    }
  }

  static async getAllById(id) {
    try {
      const [rows] = await pool.execute('SELECT * FROM all_products WHERE id = ?', [id]);
      return rows[0] || null;
    } catch (err) {
      throw new Error('Hubo un error al obtener el producto por ID');
    }
  }

  static async getById(Id_producto) {
    try {
      const [rows] = await pool.execute('SELECT * FROM products WHERE Id_producto = ?', [Id_producto]);
      return rows[0] || null;
    } catch (err) {
      throw new Error('Hubo un error al obtener el producto por ID');
    }
  }

  static async getByGender(Genero) {
    try {
      const [rows] = await pool.execute('SELECT * FROM products WHERE Genero = ?', [Genero]);
      return rows;
    } catch (err) {
      throw new Error('Hubo un error al obtener los productos por género');
    }
  }

  static async getAllRecommendedProducts() {
    try {
      const [rows] = await pool.execute('SELECT * FROM recomendacionProductos');
      return rows;
    } catch (err) {
      throw new Error('Hubo un error al obtener los productos recomendados');
    }
  }

  static async getProductRecomendedById(id_producto) {
    try {
      const [rows] = await pool.execute('SELECT * FROM recomendacionProductos WHERE id_producto = ?', [id_producto]);
      return rows[0] || null;
    } catch (err) {
      throw new Error('Hubo un error al obtener el producto recomendado por ID');
    }
  }

  static async get_all_products() {
    try {
      const [rows] = await pool.execute('SELECT * FROM all_products');
      return rows;
    } catch (err) {
      throw new Error('Hubo un error al obtener todos los productos');
    }
  }

  static async get_all_products_by_id(id) {
    try {
      const [rows] = await pool.execute('SELECT * FROM all_products WHERE id = ?', [id]);
      return rows[0] || null;
    } catch (err) {
      throw new Error('Hubo un error al obtener el producto por ID');
    }
  }

  static async searchProducts(searchTerm) {
    try {
      const query = `
        SELECT * FROM products 
        WHERE Nombre LIKE ? OR Genero LIKE ?`;
      const values = [`%${searchTerm}%`, `%${searchTerm}%`];
      const [rows] = await pool.execute(query, values);
      return rows;
    } catch (err) {
      throw new Error('Hubo un error al buscar los productos');
    }
  }

  //PARA COMENTARIOS DE ALL_PRODUCTS
  
 // Obtener un producto por ID
 static async getProductByIdFromAllProducts(id) {
  try {
    const query = `
      SELECT id
      FROM all_products
      WHERE id = ?`;
    const [rows] = await pool.execute(query, [id]);
    return rows.length > 0;
  } catch (err) {
    throw new Error('Hubo un error al obtener el producto');
  }
}

// Obtener comentarios de un producto por ID
static async getCommentsByProductIdFromAllProducts(id) {
  try {
    const query = `
      SELECT id, id_producto, comentario, username
      FROM comentariosAllProducts
      WHERE id_producto = ?`;
    const [rows] = await pool.execute(query, [id]);
    return rows;
  } catch (err) {
    throw new Error('Hubo un error al obtener los comentarios del producto');
  }
}

// Añadir un comentario a un producto
static async addCommentFromAllProducts(id_producto, comentario, username) {
  try {
    if ([id_producto, comentario, username].includes(undefined)) {
      throw new Error('Uno de los parámetros es undefined');
    }

    const query = `
      INSERT INTO comentariosAllProducts (id_producto, comentario, username)
      VALUES (?, ?, ?)`;
    const [result] = await pool.execute(query, [id_producto, comentario, username]);
    return { id: result.insertId, id_producto, comentario, username };
  } catch (err) {
    console.error('Error al añadir el comentario:', err);
    throw new Error('Error al añadir el comentario');
  }
}

// Eliminar un comentario por ID
static async eliminarComentarioFromAllProducts(id) {
  try {
    const [result] = await pool.execute('DELETE FROM comentariosAllProducts WHERE id = ?', [id]);
    return result;
  } catch (err) {
    throw new Error('Hubo un error al eliminar el comentario');
  }
}

//LO MISMO PERO PARA PRODUCTS

// Obtener un producto por ID
static async getProductByIdFromProducts(id) {
  try {
    const query = `
      SELECT Id_producto
      FROM products
      WHERE Id_producto = ?`;
    const [rows] = await pool.execute(query, [id]);
    return rows.length > 0;
  } catch (err) {
    throw new Error('Hubo un error al obtener el producto');
  }
}

// Obtener comentarios de un producto por ID
static async getCommentsByProductIdFromProducts(id) {
  try {
    const query = `
      SELECT id, id_producto, comentario, username
      FROM comentariosProducts
      WHERE id_producto = ?`;
    const [rows] = await pool.execute(query, [id]);
    return rows;
  } catch (err) {
    throw new Error('Hubo un error al obtener los comentarios del producto');
  }
}

// Añadir un comentario a un producto
static async addCommentFromProducts(id_producto, comentario, username) {
  try {
    if ([id_producto, comentario, username].includes(undefined)) {
      throw new Error('Uno de los parámetros es undefined');
    }

    const query = `
      INSERT INTO comentariosProducts (id_producto, comentario, username)
      VALUES (?, ?, ?)`;
    const [result] = await pool.execute(query, [id_producto, comentario, username]);
    return { id: result.insertId, id_producto, comentario, username };
  } catch (err) {
    console.error('Error al añadir el comentario:', err);
    throw new Error('Error al añadir el comentario');
  }
}

// Eliminar un comentario por ID
static async eliminarComentarioFromProducts(id) {
  try {
    const [result] = await pool.execute('DELETE FROM comentariosProducts WHERE id = ?', [id]);
    return result;
  } catch (err) {
    throw new Error('Hubo un error al eliminar el comentario');
  }
}
}

export default Product;