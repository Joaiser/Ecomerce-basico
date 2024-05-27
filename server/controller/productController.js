import { Product } from '../models/mysql/products.js'; 

async function ProductController(req, res, next) {
  try {
    // Obtén los productos de alguna manera
    const products = await Product.getAll();
    // Enviar los productos como respuesta al cliente
    res.json(products);
  } catch (err) {
    next(err);
  }
}
export { ProductController };