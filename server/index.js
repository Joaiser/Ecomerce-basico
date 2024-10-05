import express from 'express';
import cors from 'cors';
import session from 'express-session';
import dotenv from 'dotenv';

import { 
  getAllProductsController, 
  getProductByIdController, 
  getProductsByCategoryController,
  getAllProductsRecommendedController, 
  getProductRecommendedByIdController, 
  get_All_Products_Controller, 
  searchProductsController 
} from './controller/productController.js';

import { 
  createUser, 
  login, 
  getUserById 
} from './controller/usersController.js';

import { 
  createPostController, 
  getPostsController, 
  deletePostController, 
  createReplyController, 
  deleteReplyController,
  getIdPostController
} from './controller/forumController.js';

import { 
  getAllContestantsController, 
  getContestantByIdController, 
  registerContestantController 
} from './controller/contestController.js';

import { 
  registerAdmin, 
  loginAdmin 
} from './controller/adminController.js';

import { 
  sendMessageController 
} from './controller/contactController.js';

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
      if (!origin) return callback(null, true);

      const allowedOrigins = ['http://localhost:3000', 'http://localhost:5173'];
      if (allowedOrigins.includes(origin)) {
          return callback(null, true);
      } else {
          return callback(new Error('Not allowed by CORS'));
      }
  },
  credentials: true
}));

// Definir las rutas para productos
app.get('/products', getAllProductsController);
app.get('/products/:Id_producto', getProductByIdController);
app.get('/products/category/:Genero', getProductsByCategoryController);
app.get('/productos/recomendados', getAllProductsRecommendedController);
app.get('/productos/recomendados/:Id_producto', getProductRecommendedByIdController);
app.get('/todosproductos', get_All_Products_Controller);
app.get('/products/search', searchProductsController);

// Definir las rutas para publicaciones y respuestas en el foro
app.post('/posts', createPostController);
app.get('/posts', getPostsController);
app.delete('/posts/:postId', deletePostController);
app.post('/posts/:postId/replies', createReplyController);
app.delete('/posts/:postId/replies/:replyId', deleteReplyController);
app.get('/posts/:postId', getIdPostController);

// Definir las rutas para usuarios
app.post('/users/create', createUser);
app.post('/users/login', login);
app.get('/users/:Id_cliente', getUserById);

// Definir las rutas para concursantes
app.get('/contestants', getAllContestantsController);
app.get('/contestants/:id', getContestantByIdController);
app.post('/contestants/register', registerContestantController);

// Definir las rutas para administradores
app.post('/admins/register', registerAdmin);
app.post('/admins/login', loginAdmin);

// Definir las rutas para contacto
app.post('/contact/send', sendMessageController);

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});