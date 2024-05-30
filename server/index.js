import express from 'express';
import cors from 'cors';
import { getAllProductsController, getProductByIdController,getProductsByCategoryController } from './controller/productController.js';

const app = express();

app.use(cors({ origin: 'http://localhost:5173',credentials: true }));
app.use(express.json()); 

// Definir la ruta para GET en "/products"
app.get('/products', getAllProductsController);

// Definir la ruta para GET en "/products/:id"
app.get('/products/:Id_producto', getProductByIdController);

// Definir la ruta para GET en "/products/category/:genero"
app.get('/products/category/:Genero', getProductsByCategoryController);

// Definir la ruta para POST en "/products"
// Aquí normalmente crearías un nuevo producto en tu base de datos
// Pero por ahora, solo vamos a devolver el cuerpo de la solicitud
app.post('/products', (req, res) => {
  res.json(req.body);
});

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});