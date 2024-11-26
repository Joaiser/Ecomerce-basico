import jwt from 'jsonwebtoken';
import config from '../config.js';

export function generateToken(payload) {
    console.log("Generando token con payload:", payload); // Verifica el payload
    const accessToken = jwt.sign(payload, config.jwt.secret, { expiresIn: config.jwt.expiry });
    const refreshToken = jwt.sign(payload, config.jwt.refreshSecret, { expiresIn: config.jwt.refreshExpiry });

    console.log("AccessToken generado:", accessToken); // Verifica que el token se haya generado correctamente
    return { accessToken, refreshToken };
}
