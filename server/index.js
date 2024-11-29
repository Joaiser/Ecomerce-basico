import express from 'express';
import cors from 'cors';
import session from 'express-session';
import dotenv from 'dotenv';
import routes from './routes.js'; 
import config from './config.js';
import cookieParser from 'cookie-parser';

// Configurar dotenv para leer el archivo .env en la raíz del proyecto
dotenv.config();

const app = express();

app.use(session({
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: process.env.NODE_ENV === 'production' }
}));

app.use(express.json());

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'], // Los orígenes permitidos
  credentials: true, // Permite el envío de cookies
}));

app.use(cookieParser());

// Middleware para capturar errores de CORS de forma amigable
app.use((err, req, res, next) => {
  if (err.message === 'Not allowed by CORS') {
    console.error('[CORS Error]', err.message);
    res.status(403).json({ message: 'Access not allowed by CORS policy' });
  } else {
    next(err); // Pasar otros errores a los siguientes middlewares
  }
});

app.use(routes);

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});