import express from 'express';
import { authenticateAccessToken, authorizeAdmin, refreshAccessToken } from './middleware/authMiddleware.js'; 

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
  addCommentController,
  deleteCommentController,
  getCommentsByProductIdFromProductsController,
  deleteCommentFromProductsController,
  addCommentControllerToProduct
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
  loginAdmin,
  logout,
} from './controller/adminController.js';

import { 
  sendMessageController 
} from './controller/contactController.js';

const router = express.Router();

// Rutas para productos
router.get('/products', getAllProductsController);
router.get('/products/:Id_producto', getProductByIdController);
router.get('/products/category/:Genero', getProductsByCategoryController);
router.get('/productos/recomendados', getAllProductsRecommendedController);
router.get('/productos/recomendados/:Id_producto', getProductRecommendedByIdController);
router.get('/todosproductos', get_All_Products_Controller);
router.get('/todosproductos/:id', get_All_Products_Controller_Id);
router.get('/products/search', searchProductsController);

// Rutas para comentarios
router.get('/comentarios/:id', getCommentsByProductIdController);
router.post('/comentarios', authenticateAccessToken, addCommentController);
router.delete('/comentarios/:id', authenticateAccessToken, authorizeAdmin, deleteCommentController);

// Rutas para comentarios de productos
router.get('/comentariosProducto/:id', getCommentsByProductIdFromProductsController);
router.post('/comentariosProducto', authenticateAccessToken, addCommentControllerToProduct);
router.delete('/comentariosProducto/:id', authenticateAccessToken, authorizeAdmin, deleteCommentFromProductsController);

// Rutas para publicaciones y respuestas en el foro
router.post('/posts', authenticateAccessToken, createPostController);
router.get('/posts', getPostsController);
router.delete('/posts/:postId', authenticateAccessToken, authorizeAdmin, deletePostController);
router.post('/posts/:postId/replies', authenticateAccessToken, createReplyController);
router.delete('/posts/:postId/replies/:replyId', authenticateAccessToken, authorizeAdmin, deleteReplyController);
router.get('/posts/:postId', getIdPostController);

// Rutas para usuarios
router.post('/users/create', createUser);
router.post('/users/login', login);
router.get('/users/:Id_cliente', getUserById);

// Rutas para concursantes
router.get('/contestants', getAllContestantsController);
router.get('/contestants/:id', authenticateAccessToken, authorizeAdmin, getContestantByIdController);
router.post('/contestants/register', authenticateAccessToken, registerContestantController);

// Rutas para administradores
router.post('/admins/register', registerAdmin);
router.post('/admins/login', loginAdmin);
router.post('/admins/logout', logout);
router.get('/admin/dashboard', authenticateAccessToken, authorizeAdmin, (req, res) => {
  res.send('Ruta protegida para administradores');
});

// Rutas para contacto
router.post('/contact/send', sendMessageController, authenticateAccessToken);

// Endpoint para renovar el accessToken
router.post('/refreshtoken', refreshAccessToken);

export default router;