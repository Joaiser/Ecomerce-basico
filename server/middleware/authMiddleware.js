import jwt from 'jsonwebtoken';
import { generateToken } from '../tokenUtils/tokenUtils.js';
import config from '../config.js';

export function authenticateAccessToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'Authorization header missing' });

  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
          if (err.name === 'TokenExpiredError') {
              return res.status(401).json({ message: 'Token expired', expiredAt: err.expiredAt });
          }
          return res.status(403).json({ message: 'Invalid token' });
      }
      req.user = user;
      next();
  });
}

export function authorizeAdmin(req, res, next) {
    if (req.user.role !== 'admin') {
        // console.log('[AuthMiddleware] Unauthorized access for user:', req.user.username);
        return res.status(403).json({ message: 'Forbidden: Admins only' });
    }

    // console.log('[AuthMiddleware] Admin access granted for user:', req.user.username);
    next(); // Continuar si el usuario tiene permiso
}

export function refreshAccessToken(req, res) {
    // console.log('[AuthMiddleware] Received refresh token request');
    // console.log('[AuthMiddleware] Cookies recibidas:', req.cookies);

    const refreshToken = req.cookies.refreshToken;

    // if (!refreshToken) {
    //     // console.log('[AuthMiddleware] No refresh token provided');
    //     return res.status(401).json({ message: 'No refresh token provided' });
    // }

    jwt.verify(refreshToken, config.jwt.refreshSecret, (err, user) => {
        if (err) {
            // console.log('[AuthMiddleware] Error verifying token:', err);
            if (err.name === 'TokenExpiredError') {
                return res.status(403).json({ message: 'Refresh token expired' });
            }
            return res.status(403).json({ message: 'Invalid refresh token' });
        }

        // console.log('[AuthMiddleware] Token verificado, usuario:', user);

        const { accessToken } = generateToken({ username: user.username, role: user.role });

        // console.log(
        //     '[AuthMiddleware] Nuevo accessToken generado:',
        //     accessToken.slice(0, 10) + '...'
        // );

        res.setHeader('Cache-Control', 'no-store');
        return res.status(200).json({
            success: true,
            message: 'Access token refreshed successfully',
            accessToken
        });
    });
}
