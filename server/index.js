import express from 'express';
import cors from 'cors';
import session from 'express-session';
import { getAllProductsController, getProductByIdController, getProductsByCategoryController,
   getAllProductsRecommendedController, getProductRecommendedByIdController, get_All_Products_Controller, searchProductsController} 
from './controller/productController.js';
import { createUser, login, getUserById } from './controller/usersController.js';
import { createPostController, getPostsController } from './controller/forumController.js'; 
import { getAllContestantsController, getContestantByIdController, registerContestantController } 
from './controller/contestController.js'; 
import { registerAdmin, loginAdmin } from './controller/adminController.js';
import { sendMessageController } from './controller/contactController.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

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

// Definir la ruta para POST en "/admins/register"
app.post('/admins/register', registerAdmin);

// Definir la ruta para POST en "/admins/login"
app.post('/admins/login', loginAdmin);

// Definir la ruta para POST en "/users/create"
app.post('/users/create', createUser);

// Definir la ruta para POST en "/users/login"
app.post('/users/login', login);

// Definir la ruta para GET en "/todosproductos"
app.get('/todosproductos', get_All_Products_Controller);

// Definir la ruta para GET en "/users/:Id_cliente"
app.get('/users/:Id_cliente', getUserById);

// Definir la ruta para GET en "/contestants"
app.get('/contestants', getAllContestantsController);

// Definir la ruta para GET en "/contestants/:id"
app.get('/contestants/:id', getContestantByIdController);


// Definir la ruta para POST en "/contestants/register"
app.post('/contestants/register', registerContestantController);

// Definir la ruta para POST en "/contact/send"
app.post('/contact/send', sendMessageController);

// Definir la ruta para GET en "/products/search" para buscar productos
app.get('/products/search', searchProductsController);

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});