import express from 'express';
import bcrypt from 'bcrypt';
import { body, validationResult } from 'express-validator';
import User from '../models/mysql/users.js';

const router = express.Router();

export const createUser = async (req, res) => {
  // Validaciones
  await body('Nickname').notEmpty().withMessage('El nickname es requerido').run(req);
  await body('Password_clientes').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres')
    .matches(/\d/).withMessage('La contraseña debe contener al menos un número')
    .matches(/^[a-zA-Z0-9]*$/).withMessage('La contraseña solo puede contener letras y números').run(req);
  await body('users_correo').isEmail().withMessage('El correo electrónico no es válido').run(req);

  // Verificar si hay errores de validación
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Encriptar la contraseña
  const hashedPassword = await bcrypt.hash(req.body.Password_clientes, 10);

  // Crear el usuario en la base de datos
  try {
    const userId = await User.createUser(req.body.Nickname, hashedPassword, req.body.users_correo);
    res.json({ message: 'Cuenta creada con éxito', userId: userId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  // Validaciones
  await body('Nickname').notEmpty().withMessage('El nickname es requerido').run(req);
  await body('Password_clientes').notEmpty().withMessage('La contraseña es requerida').run(req);

  // Verificar si hay errores de validación
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Buscar al usuario en la base de datos
  try {
    const user = await User.getUserByNickname(req.body.Nickname);
    if (!user) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    // Verificar si la contraseña proporcionada coincide con la almacenada en la base de datos
    const match = await bcrypt.compare(req.body.Password_clientes, user.Password_clientes);
    if (!match) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    // Si todo está bien, responder con un mensaje de éxito
    res.json({ message: 'Inicio de sesión exitoso', userId: user.Id_cliente });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};