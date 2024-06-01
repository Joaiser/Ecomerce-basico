import bcrypt from 'bcrypt';
import { body, validationResult } from 'express-validator';
import User from '../models/mysql/users.js';

export const createUser = async (req, res) => {
  try {
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

    // Verificar si el correo electrónico ya existe en la base de datos
    const existingUserByEmail = await User.getUserByEmail(req.body.users_correo);
    if (existingUserByEmail) {
    return res.status(400).json({ message: 'El correo electrónico ya está en uso' });
    }

    // Verificar si el nickname ya existe en la base de datos
    const existingUserByNickname = await User.getUserByNickname(req.body.Nickname);
    if (existingUserByNickname) {
      return res.status(400).json({ message: 'El nickname ya está en uso' });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(req.body.Password_clientes, 10);

    // Crear el usuario en la base de datos
    const userId = await User.createUser(req.body.Nickname, hashedPassword, req.body.users_correo);
    res.json({ message: 'Cuenta creada con éxito', userId: userId });
  } catch (err) {
    res.status(500).json({ message: 'Ha ocurrido un error inesperado, prueba con otros datos.' });
  }
};

export const login = async (req, res) => {
  try {
    // Validaciones
    await body('Nickname').notEmpty().withMessage('El nickname es requerido').run(req);
    await body('Password_clientes').notEmpty().withMessage('La contraseña es requerida').run(req);

    // Verificar si hay errores de validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Buscar al usuario en la base de datos
    const user = await User.getUserByNickname(req.body.Nickname);
    if (!user) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    // Verificar si la contraseña proporcionada coincide con la almacenada en la base de datos
    const match = await bcrypt.compare(req.body.Password_clientes, user.Password_clientes);
    if (!match) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    // Si todo está bien, guardar la información del usuario en la sesión y responder con un mensaje de éxito
    req.session.user = user;
    res.json({ message: 'Inicio de sesión exitoso', userId: user.Id_cliente });
  } catch (err) {
    res.status(500).json({ message: 'Ha ocurrido un error inesperado, prueba con otros datos.' });
  }
};

export const getUserById = async (req, res) => {
  try {
    // Obtener el Id_cliente del parámetro de la ruta
    const Id_cliente = req.params.Id_cliente;

    // Buscar al usuario en la base de datos
    const user = await User.getUserById(Id_cliente);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Responder con la información del usuario
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Ha ocurrido un error inesperado, prueba con otros datos.' });
  }
};