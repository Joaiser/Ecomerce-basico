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
        console.log('[AuthMiddleware] Unauthorized access for user:', req.user.username);
        return res.status(403).json({ message: 'Forbidden: Admins only' });
    }

    console.log('[AuthMiddleware] Admin access granted for user:', req.user.username);
    next(); // Continuar si el usuario tiene permiso
}

export function refreshAccessToken(req, res) {
//   const refreshToken = req.cookies.refreshToken;

//   if (!refreshToken) {
//       return res.status(401).json({ message: 'No refresh token provided' });
//   }

//   // Verificar el refreshToken
//   jwt.verify(refreshToken, config.jwt.refreshSecret, (err, user) => {
//       if (err) {
//           return res.status(403).json({ message: 'Invalid refresh token' });
//       }

//       // Si el refreshToken es válido, generar un nuevo accessToken
//       const { accessToken } = generateToken({ username: user.username, role: user.role });

//       console.log('[AuthMiddleware] New access token generated at:', new Date().toISOString(), 'Token:', accessToken);

//       return res.status(200).json({ accessToken });
//   });
}