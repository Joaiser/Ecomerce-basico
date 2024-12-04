import Product from '../models/mysql/products.js'; 
import { getUserIdByUsername } from '../models/mysql/forum.js';

export async function getAllProductsController(req, res, next) {
  try {
    const products = await Product.getAllProducts();
    res.json(products);
  } catch (err) {
    next(err);
  }
}

export async function getProductByIdController(req, res, next) {
  try {
    const id = req.params.Id_producto;
    const product = await Product.getById(id);
    res.json(product);
  } catch (err) {
    next(err);
  }
}

export async function getAllProductByIdController(req, res, next) {
  try {
    const id = req.params.Id_producto;
    const product = await Product.getAllById(id);
    res.json(product);
  } catch (err) {
    next(err);
  }
}

export async function getProductsByCategoryController(req, res, next) {
  try {
    const category = req.params.Genero;
    const products = await Product.getByGender(category); 
    res.json(products);
  } catch (err) {
    next(err);
  }
}

export async function getAllProductsRecommendedController(req, res, next) {
  try {
    const products = await Product.getAllRecommendedProducts();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Hubo un error al obtener los productos recomendados' });
  }
}

export async function getProductRecommendedByIdController(req, res, next) {
  try {
    const id = req.params.Id_producto;
    const product = await Product.getProductRecomendedById(id);
    res.json(product);
  } catch (err) {
    next(err);
  }
}

export async function get_All_Products_Controller(req, res, next) {
  try {
    const product = await Product.get_all_products();
    res.json(product);
  } catch (err) {
    next(err);
  }
}

export async function get_All_Products_Controller_Id(req, res, next) {
  try {
    const id = req.params.id;
    const product = await Product.get_all_products_by_id(id);
    res.json(product);
  } catch (err) {
    next(err);
  }
}

export async function searchProductsController(req, res, next) {
  try {
    const searchTerm = req.query.query;
    const products = await Product.searchProducts(searchTerm);
    res.json(products);
  } catch (err) {
    next(err);
  }
}

// Para comentarios de los productos de all_products

// Añadir un comentario a un producto de all_products
export async function addCommentController(req, res) {
  const { id_producto, comentario, username } = req.body;

  if (username === undefined || id_producto === undefined || comentario === undefined) {
    res.status(400).json({ message: 'Faltan datos necesarios' });
    return;
  }

  try {
    // Verificar si el producto existe
    const productExists = await Product.getProductByIdFromAllProducts(id_producto);
    if (!productExists) {
      res.status(400).json({ message: 'El producto no existe' });
      return;
    }

    // Añadir comentario
    const result = await Product.addCommentFromAllProducts(id_producto, comentario, username);
    res.status(201).json({ message: 'Comentario añadido exitosamente', commentId: result.id });
  } catch (err) {
    console.error('Error al añadir comentario:', err);
    res.status(500).json({ message: 'Error al añadir el comentario', error: err });
  }
}

// Obtener todos los comentarios de un producto de all_products
export async function getCommentsByProductIdController(req, res, next) {
  try {
    const id = req.params.id;
    const comments = await Product.getCommentsByProductIdFromAllProducts(id);
    res.json(comments);
  } catch (err) {
    next(err);
  }
}

// Eliminar un comentario de un producto de all_products
export async function deleteCommentController(req, res, next) {
  try {
    const isAdmin = req.headers['x-is-admin'] === 'true';

    if (!isAdmin) {
      return res.status(403).json({ message: 'Acceso denegado. Solo los administradores pueden eliminar comentarios.' });
    }

    const id = req.params.id;
    const result = await Product.eliminarComentarioFromAllProducts(id);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

// Para comentarios de los productos de products

// Añadir un comentario a un producto de products
export async function addCommentControllerToProduct(req, res) {
  const { id_producto, comentario, username } = req.body;

  if (username === undefined || id_producto === undefined || comentario === undefined) {
    res.status(400).json({ message: 'Faltan datos necesarios' });
    return;
  }

  try {
    // Verificar si el producto existe
    const productExists = await Product.getProductByIdFromProducts(id_producto);
    if (!productExists) {
      res.status(400).json({ message: 'El producto no existe' });
      return;
    }

    // Añadir comentario
    const result = await Product.addCommentFromProducts(id_producto, comentario, username);
    res.status(201).json({ message: 'Comentario añadido exitosamente', commentId: result.id });
  } catch (err) {
    console.error('Error al añadir comentario:', err);
    res.status(500).json({ message: 'Error al añadir el comentario', error: err });
  }
}

// Obtener todos los comentarios de un producto de products
export async function getCommentsByProductIdFromProductsController(req, res, next) {
  try {
    const id = req.params.id;
    const comments = await Product.getCommentsByProductIdFromProducts(id);
    res.json(comments);
  } catch (err) {
    next(err);
  }
}

// Eliminar un comentario de un producto de products
export async function deleteCommentFromProductsController(req, res, next) {
  try {
    const isAdmin = req.headers['x-is-admin'] === 'true';

    if (!isAdmin) {
      return res.status(403).json({ message: 'Acceso denegado. Solo los administradores pueden eliminar comentarios.' });
    }

    const id = req.params.id;
    const result = await Product.eliminarComentarioFromProducts(id);
    res.json(result);
  } catch (err) {
    next(err);
  }
}