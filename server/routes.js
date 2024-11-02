// En tu archivo de rutas (por ejemplo, routes.js)
import express from 'express';
import { 
  getAllProductsController, 
  getProductByIdController, 
  getProductsByCategoryController,
  getAllProductsRecommendedController, 
  getProductRecommendedByIdController, 
  get_All_Products_Controller, 
  searchProductsController,
  get_All_Products_Controller_Id,
  getCommentsByProductIdController,
  addCommentController
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

const router = express.Router();

// Definir las rutas para productos
router.get('/products', getAllProductsController);
router.get('/products/:Id_producto', getProductByIdController);
router.get('/products/category/:Genero', getProductsByCategoryController);
router.get('/productos/recomendados', getAllProductsRecommendedController);
router.get('/productos/recomendados/:Id_producto', getProductRecommendedByIdController);
router.get('/todosproductos', get_All_Products_Controller);
router.get('/todosproductos/:id', get_All_Products_Controller_Id);
router.get('/products/search', searchProductsController);

// Definir las rutas para comentarios
router.get('/comentarios/:id', getCommentsByProductIdController);
router.post('/comentarios', addCommentController);

// Definir las rutas para publicaciones y respuestas en el foro
router.post('/posts', createPostController);
router.get('/posts', getPostsController);
router.delete('/posts/:postId', deletePostController);
router.post('/posts/:postId/replies', createReplyController);
router.delete('/posts/:postId/replies/:replyId', deleteReplyController);
router.get('/posts/:postId', getIdPostController);

// Definir las rutas para usuarios
router.post('/users/create', createUser);
router.post('/users/login', login);
router.get('/users/:Id_cliente', getUserById);

// Definir las rutas para concursantes
router.get('/contestants', getAllContestantsController);
router.get('/contestants/:id', getContestantByIdController);
router.post('/contestants/register', registerContestantController);

// Definir las rutas para administradores
router.post('/admins/register', registerAdmin);
router.post('/admins/login', loginAdmin);

// Definir las rutas para contacto
router.post('/contact/send', sendMessageController);

export default router;