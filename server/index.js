const express = require('express');
const app = express();
import { getImages } from './controller/productController';

// Define la ruta /api/images primero
app.get('/api/images', getImages);

// Luego define las demás rutas
// ...

app.use('/static', express.static('public/static'));

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});