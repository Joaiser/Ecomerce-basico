import { Product } from '../models/mysql/products.js'; 

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

//Para comentarios de los productos

// Añadir un comentario a un producto
export async function addCommentController(req, res, next) {
  try {
    const { id_producto, comentario, id_cliente, id_administrador } = req.body;
    console.log('Adding comment:', { id_producto, comentario, id_cliente, id_administrador }); // Log para verificar los datos
    const result = await Product.addComment(id_producto, comentario, id_cliente, id_administrador);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

// Obtener todos los comentarios de un producto
export async function getCommentsByProductIdController(req, res, next) {
  try {
    const id = req.params.id;
    console.log(`Fetching comments for product ID: ${id}`);
    const comments = await Product.getCommentsByProductId(id); // Usar la función correcta
    console.log('Comments fetched:', comments);
    res.json(comments);
  } catch (err) {
    next(err);
  }
}

// Eliminar un comentario de un producto
export async function deleteCommentController(req, res, next) {
  try {
    const isAdmin = req.headers['x-is-admin'] === 'true';
    console.log(`Is Admin: ${isAdmin}`);

    if (!isAdmin) {
      return res.status(403).json({ message: 'Acceso denegado. Solo los administradores pueden eliminar comentarios.' });
    }

    const id = req.params.id;
    console.log(`Deleting comment with ID: ${id}`);
    const result = await Product.eliminarComentario(id);
    console.log('Comment deleted:', result);
    res.json(result);
  } catch (err) {
    next(err);
  }
}