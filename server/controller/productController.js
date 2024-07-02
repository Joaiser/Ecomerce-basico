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
    const products = await Product.get_all_products();
    res.json(products);
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