import { registerAdminInDB, getAdminInDB } from '../models/mysql/administrer.js';
import config from '../config.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../tokenUtils/tokenUtils.js';

export async function registerAdmin(req, res) {
    try {
        const { username, password } = req.body;

        console.log('[RegisterAdmin] Received data:', { username, password });

        if (!username || !password) {
            console.log('[RegisterAdmin] Missing username or password');
            return res.status(400).json({ error: 'Username and password are required.' });
        }

        const adminData = await registerAdminInDB(username, password);
        console.log('[RegisterAdmin] Admin registered successfully:', adminData);

        res.json({ success: true, admin: adminData });
    } catch (error) {
        console.error('[RegisterAdmin] Error registering admin:', error);
        res.status(500).json({ error: error.toString() });
    }
}


export async function loginAdmin(req, res) {
    try {
        const { username, password } = req.body;
        
        if (!username || !password) {
            return res.status(400).json({ error: 'Nombre y contraseña son requeridos.' });
        }

        const adminData = await getAdminInDB(username.trim());
        
        if (!adminData) {
            return res.status(401).json({ success: false, message: 'Nombre o contraseña incorrectos' });
        }

        const isPasswordCorrect = await bcrypt.compare(password.trim(), adminData.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ success: false, message: 'Nombre o contraseña incorrectos' });
        }

        // Si las credenciales son correctas, genera el token
        const tokenPayload = { username, role: 'admin' };
        const { accessToken, refreshToken } = generateToken(tokenPayload);

        // Configura la cookie de refreshToken con httpOnly, secure y SameSite
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,  // No se puede acceder al token desde JavaScript
            secure: process.env.NODE_ENV === 'production' ? config.cookieOptions.secure : false,  // Solo usar HTTPS en producción
            maxAge: 7 * 24 * 60 * 60 * 1000,  // Expira en 7 días
            sameSite: config.cookieOptions.sameSite,  // Asegura que solo se envíe la cookie en el mismo contexto (previene CSRF)
        });

        // Responde con un mensaje de éxito y el accessToken
        res.status(200).json({ success: true, message: 'Login successful', accessToken, expiresIn: 600 });
    } catch (error) {
        console.error('Error al iniciar sesión:', error.response?.data || error.message);
        res.status(500).json({ error: error.toString() });
    }
}

export async function logout(req, res) {
    res.clearCookie('refreshToken', {
        httpOnly: config.cookieOptions.httpOnly,
        secure: process.env.NODE_ENV === 'production' ? config.cookieOptions.secure : false, // En desarrollo debe ser false
        sameSite: config.cookieOptions.sameSite,
        path: '/', // la cookie se borra en todas las rutas
    });
    res.status(200).json({ message: 'Logged out successfully' });
}

