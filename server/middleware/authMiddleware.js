import jwt from 'jsonwebtoken';
import config from '../config.js';
import { generateToken } from '../tokenUtils/tokenUtils.js';

// Middleware para autenticar el accessToken
export function authenticateAccessToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Obtener el token del encabezado "Authorization"

    if (!token) {
        console.log('[AuthMiddleware] No token provided.');
        return res.status(401).json({ message: 'Unauthorized: Token required' });
    }

    jwt.verify(token, config.jwt.secret, (err, decoded) => {
        if (err) {
            console.log('[AuthMiddleware] Invalid token:', err);
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }

        req.user = decoded; // Adjuntar los datos del token decodificado a la solicitud
        console.log('[AuthMiddleware] Token verified successfully:', decoded);
        next(); // Continuar con la solicitud
    });
}

// Middleware para validar el refreshToken
export function authenticateRefreshToken(req, res, next) {
    const refreshToken = req.cookies.refreshToken; // Obtener el refreshToken de las cookies

    if (!refreshToken) {
        console.log('[AuthMiddleware] No refresh token provided.');
        return res.status(401).json({ message: 'Unauthorized: Refresh token required' });
    }

    jwt.verify(refreshToken, config.jwt.refreshSecret, (err, decoded) => {
        if (err) {
            console.log('[AuthMiddleware] Invalid refresh token:', err);
            return res.status(401).json({ message: 'Unauthorized: Invalid refresh token' });
        }

        req.user = decoded; // Adjuntar los datos del token decodificado a la solicitud
        console.log('[AuthMiddleware] Refresh token verified successfully:', decoded);
        next(); // Continuar con la solicitud
    });
}

// Middleware para verificar que el usuario tiene rol de "admin"
export function authorizeAdmin(req, res, next) {
    if (req.user.role !== 'admin') {
        console.log('[AuthMiddleware] Unauthorized access for user:', req.user.username);
        return res.status(403).json({ message: 'Forbidden: Admins only' });
    }

    console.log('[AuthMiddleware] Admin access granted for user:', req.user.username);
    next(); // Continuar si el usuario tiene permiso
}

// Controlador para manejar la renovación del accessToken
export function refreshAccessToken(req, res) {
    const user = req.user; // El token decodificado ya debería estar en req.user
    const tokenPayload = { username: user.username, role: user.role };

    // Generar un nuevo accessToken usando los datos del refreshToken
    const { accessToken } = generateToken(tokenPayload);
    console.log('[AuthMiddleware] New access token generated:', accessToken);

    // Enviar el nuevo accessToken al cliente
    res.status(200).json({ accessToken });
}

// Middleware opcional para limpiar cookies (puede usarse para logout)
export function clearCookie(req, res) {
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
        path: '/',
    });
    res.status(200).json({ message: 'Cookie cleared' });
}
