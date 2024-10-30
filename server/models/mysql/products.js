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
}