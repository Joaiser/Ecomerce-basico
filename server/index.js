import express from 'express';
import cors from 'cors';
import session from 'express-session';
import dotenv from 'dotenv';
import routes from './routes.js'; // Importa el archivo de rutas

// Configurar dotenv para leer el archivo .env en la raíz del proyecto
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

app.use(routes);

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});