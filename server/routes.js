import express from 'express';
import { authenticateAccessToken, authenticateRefreshToken, authorizeAdmin } from './middleware/authMiddleware.js';  

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
  deleteCommentController
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
  logout
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
router.post('/comentarios', addCommentController);
router.delete('/comentarios/:id', deleteCommentController);

// Rutas para publicaciones y respuestas en el foro
router.post('/posts', createPostController);
router.get('/posts', getPostsController);
router.delete('/posts/:postId', deletePostController);
router.post('/posts/:postId/replies', createReplyController);
router.delete('/posts/:postId/replies/:replyId', deleteReplyController);
router.get('/posts/:postId', getIdPostController);

// Rutas para usuarios
router.post('/users/create', createUser);
router.post('/users/login', login);
router.get('/users/:Id_cliente', getUserById);

// Rutas para concursantes
router.get('/contestants', getAllContestantsController);
router.get('/contestants/:id', getContestantByIdController);
router.post('/contestants/register', registerContestantController);

// Rutas para administradores
router.post('/admins/register', registerAdmin);
router.post('/admins/login', loginAdmin);
router.post('/admins/logout', logout);
router.get('/admin/dashboard', authenticateAccessToken, authorizeAdmin, (req, res) => {
  // Si llegamos aquí, el token es válido y el usuario tiene acceso
  console.log('[AdminRoute] Admin access granted:', req.admin.username);
  res.send('This is a protected route for admins');
});

// Rutas para contacto
router.post('/contact/send', sendMessageController);

// Endpoint para renovar el accessToken
router.post('/token/refresh', authenticateRefreshToken, authenticateAccessToken);

export default router;
