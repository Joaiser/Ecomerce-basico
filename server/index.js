import express from 'express';
import cors from 'cors';
import session from 'express-session';
import { getAllProductsController, getProductByIdController, getProductsByCategoryController,
   getAllProductsRecommendedController, getProductRecommendedByIdController, get_All_Products_Controller} 
from './controller/productController.js';
import { createUser, login, getUserById } from './controller/usersController.js';
import { createPostController, getPostsController } from './controller/forumController.js'; 
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors({
  origin: function (origin, callback) {
      // Permitir solicitudes sin origen (por ejemplo, solicitudes de Postman)
      if (!origin) return callback(null, true);

      const allowedOrigins = ['http://localhost:3000', 'http://localhost:5173'];
      if (allowedOrigins.includes(origin)) {
          // Si el origen está en la lista de orígenes permitidos, aceptar la solicitud
          return callback(null, true);
      } else {
          // De lo contrario, rechazar la solicitud
          return callback(new Error('Not allowed by CORS'));
      }
  },
  credentials: true
}));

app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));


app.use(cors({
  origin: function (origin, callback) {
      // Permitir solicitudes sin origen (por ejemplo, solicitudes de Postman)
      if (!origin) return callback(null, true);

      const allowedOrigins = ['http://localhost:3000', 'http://localhost:5173'];
      if (allowedOrigins.includes(origin)) {
          // Si el origen está en la lista de orígenes permitidos, aceptar la solicitud
          return callback(null, true);
      } else {
          // De lo contrario, rechazar la solicitud
          return callback(new Error('Not allowed by CORS'));
      }
  },
  credentials: true
}));
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

// Definir la ruta para POST en "/posts"
app.post('/posts', createPostController);

// Definir la ruta para GET en "/posts"
app.get('/posts', getPostsController);

app.post('/users/create', createUser);

app.post('/users/login', login);

app.get('/todosproductos', get_All_Products_Controller);

app.get('/users/:Id_cliente', getUserById);

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});