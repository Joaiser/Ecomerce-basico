import dotenv from 'dotenv';

dotenv.config();

export default {
    db: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        name: process.env.DB_NAME
    },
    sessionSecret: process.env.SESSION_SECRET,
    jwt: {
        secret: process.env.JWT_SECRET,
        refreshSecret: process.env.JWT_REFRESH_SECRET,
        userSecret: process.env.JWT_SECRET_USER,
        expiry: '3s', // Tiempo de expiración del token
        refreshExpiry: '7d' // Tiempo de expiración del token de refresco
    },
    cookieOptions: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Solo en producción
        sameSite: 'strict'
    }
};