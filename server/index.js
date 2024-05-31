import express from 'express';
import cors from 'cors';
import { getAllProductsController, getProductByIdController, getProductsByCategoryController,
   getAllProductsRecommendedController, getProductRecommendedByIdController } 
from './controller/productController.js';
import { createUser, login } from './controller/usersController.js';

const app = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

// Definir la ruta para GET en "/products"
app.get('/products', getAllProductsController);

// Definir la ruta para GET en "/products/:id"
app.get('/products/:Id_producto', getProductByIdController);

// Definir la ruta para GET en "/products/category/:genero"
app.get('/products/category/:Genero', getProductsByCategoryController);

// Definir la ruta para GET en "/products/recommended"
app.get('/productos/recomendados', getAllProductsRecommendedController);

// Definir la ruta para GET en "/products/recommended/:id"
app.get('/productos/recomendados/:Id_producto', getProductRecommendedByIdController);

app.post('/users/create', createUser);
app.post('/users/login', login);

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
