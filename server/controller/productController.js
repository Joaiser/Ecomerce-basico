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
    const id = req.params.id;
    const product = await Product.getById(id);
    res.json(product);
  } catch (err) {
    next(err);
  }
}

export async function getProductsByCategoryController(req, res, next) {
  try {
    const category = req.params.genero;
    const products = await Product.getByCategory(category);
    res.json(products);
  } catch (err) {
    next(err);
  }
}