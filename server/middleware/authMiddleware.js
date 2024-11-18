// middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import config from '../config.js';
import { generateToken } from '../tokenUtils/tokenUtils.js';

// Middleware para autenticar el accessToken
export function authenticateAccessToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Obtener el token desde el encabezado

    if (!token) {
        console.log('[AuthMiddleware] No token provided.');
        return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(token, config.jwt.secret, (err, decoded) => {
        if (err) {
            console.log('[AuthMiddleware] Invalid token:', err);
            return res.status(401).json({ message: 'Unauthorized' });
        }

        req.user = decoded; // Adjuntar el token decodificado a la solicitud
        console.log('[AuthMiddleware] Token verified successfully:', decoded);
        next();
    });
}

export function authorizeAdmin(req, res, next) {
    if (req.user.role !== 'admin') {
        console.log('[AuthMiddleware] Unauthorized access for user:', req.user.username);
        return res.status(403).json({ message: 'Forbidden' });
    }

    console.log('[AuthMiddleware] Admin access granted:', req.user.username);
    next();
}

// Middleware para validar el refreshToken
export function authenticateRefreshToken(req, res, next) {
    const refreshToken = req.cookies.refreshToken; // Obtener el refreshToken de las cookies

    if (!refreshToken) {
        console.log('[AuthMiddleware] No refresh token provided.');
        return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(refreshToken, config.jwt.refreshSecret, (err, decoded) => {
        if (err) {
            console.log('[AuthMiddleware] Invalid refresh token:', err);
            return res.status(401).json({ message: 'Unauthorized' });
        }

        req.user = decoded; // Adjuntar el token decodificado a la solicitud
        console.log('[AuthMiddleware] Refresh token verified successfully:', decoded);
        next();
    });
}

// Controlador para manejar la renovación del accessToken
export function refreshAccessToken(req, res) {
    const user = req.user; // El token decodificado ya debería estar en req.user
    const tokenPayload = { username: user.username, role: user.role };

    const { accessToken } = generateToken(tokenPayload); // Generar solo el accessToken
    console.log('[AuthMiddleware] New access token generated:', accessToken);

    res.status(200).json({ accessToken });
}

export function clearCookie(req, res) {
    res.clearCookie('refreshToken',{
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
        path: '/',
    }); // Limpiar la cookie del refreshToken
    res.status(200).json({ message: 'Cookie cleared' });
}
