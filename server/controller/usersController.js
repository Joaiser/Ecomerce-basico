import bcrypt from 'bcrypt';
import { z } from 'zod';
import User from '../models/mysql/users.js';
import { generateToken } from '../tokenUtils/tokenUtils.js';
import config from '../config.js';

// **Zod Schemas para Validaciones**
const registerSchema = z.object({
    Nickname: z.string().nonempty('El nickname es requerido'),
    Password_clientes: z
        .string()
        .min(8, 'La contraseña debe tener al menos 8 caracteres')
        .regex(/\d/, 'La contraseña debe contener al menos un número')
        .regex(/^[a-zA-Z0-9]*$/, 'La contraseña solo puede contener letras y números'),
    users_correo: z.string().email('El correo electrónico no es válido'),
});

const loginSchema = z.object({
    Nickname: z.string().nonempty('El nickname es requerido'),
    Password_clientes: z.string().nonempty('La contraseña es requerida'),
});

//Controladores
export const createUser = async (req, res) => {
    try {
        // Validar datos con Zod
        const validatedData = registerSchema.parse(req.body);

        // Verificar si el correo electrónico ya existe en la base de datos
        const existingUserByEmail = await User.getUserByEmail(validatedData.users_correo);
        if (existingUserByEmail) {
            return res.status(400).json({ message: 'El correo electrónico ya está en uso' });
        }

        // Verificar si el nickname ya existe en la base de datos
        const existingUserByNickname = await User.getUserByNickname(validatedData.Nickname);
        if (existingUserByNickname) {
            return res.status(400).json({ message: 'El nickname ya está en uso' });
        }

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(validatedData.Password_clientes, 10);

        // Crear el usuario en la base de datos
        const userId = await User.createUser(validatedData.Nickname, hashedPassword, validatedData.users_correo);
        res.json({ message: 'Cuenta creada con éxito', userId: userId });
    } catch (err) {
        if (err instanceof z.ZodError) {
            // Si el error proviene de Zod
            return res.status(400).json({ errors: err.errors.map(e => e.message) });
        }
        console.error(err);
        res.status(500).json({ message: 'Ha ocurrido un error inesperado, prueba con otros datos.' });
    }
};

export const login = async (req, res) => {
    try {
        // Validar datos con Zod
        const validatedData = loginSchema.parse(req.body);

        // Buscar al usuario en la base de datos
        console.log('Validating login for Nickname:', validatedData.Nickname);
        const user = await User.getUserByNickname(validatedData.Nickname);
        console.log('User found:', user);
        if (!user) {
            return res.status(400).json({ message: 'Usuario no encontrado' });
        }

        // Verificar si la contraseña proporcionada coincide con la almacenada en la base de datos
        const match = await bcrypt.compare(validatedData.Password_clientes, user.Password_clientes);
        if (!match) {
            return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
        }

        // Crear tokens
        const tokenPayLoad = { Nickname: user.Nickname, role: 'user' };
        const { accessToken, refreshToken } = generateToken(tokenPayLoad);

        // Configurar la cookie de refreshToken con httpOnly, secure y SameSite
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production' ? config.cookieOptions.secure : false,
            maxAge: 7 * 24 * 60 * 60 * 1000, // Expira en 7 días
            sameSite: 'Strict',
        });

        // Responder con el token de acceso y la información del usuario
        res.status(200).json({
            message: 'Inicio de sesión exitoso',
            user: {
                Nickname: user.Nickname,
                email: user.users_correo,
            },
            accessToken: accessToken,
        });
    } catch (err) {
        if (err instanceof z.ZodError) {
            const errorMessage = err.errors.map(error => error.message).join(', ');
            return res.status(400).json({ message: `Datos inválidos: ${errorMessage}` });
        }        
        console.error(err);
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
        console.error(err);
        res.status(500).json({ message: 'Ha ocurrido un error inesperado, prueba con otros datos.' });
    }
};

 export async function userLogout(req,res) {  
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production' ? true : false,
        sameSite: 'Strict',
        path: '/',
    });
    res.status(200).json({ message: 'Logged out successfully' });
 }

