import jwt from 'jsonwebtoken';
import config from '../config.js';

export function generateToken(payload) {
    const accessToken = jwt.sign(payload, config.jwt.secret, {
        expiresIn: config.jwt.expiry, // Utiliza la configuración de expiración del token
    });

    const refreshToken = jwt.sign(payload, config.jwt.refreshSecret, {
        expiresIn: config.jwt.refreshExpiry, // Utiliza la configuración de expiración del token de refresco
    });

    return { accessToken, refreshToken };
}