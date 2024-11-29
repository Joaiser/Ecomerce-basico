import jwtDecode from 'jwt-decode';
import axios from 'axios';

/**
 * Almacena el token de acceso en localStorage.
 * @param {string} accessToken - El token de acceso que se desea guardar.
 */
export const storeAccessToken = (accessToken) => {
    if (accessToken && typeof accessToken === 'string') {
        localStorage.setItem('accessToken', accessToken);
    } else {
        console.warn('Intentando almacenar un accessToken inválido: ', accessToken);
    }
};

/**
 * Elimina el token de acceso del localStorage.
 */
export const clearAccessToken = () => {
    localStorage.removeItem('accessToken');
};

/**
 * Comprueba si el usuario actual tiene el rol de admin.
 * @returns {boolean} `true` si el usuario es admin, `false` en caso contrario.
 */
export const isAdmin = () => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) return false;

    try {
        const decodedToken = jwtDecode(accessToken);
        return decodedToken.role === 'admin'; // Comprobar el rol en el token
    } catch (error) {
        console.error('Error al decodificar el token:', error);
        return false;
    }
};

/**
 * Comprueba si el usuario actual tiene el rol de user.
 * @returns {boolean} `true` si el usuario es un usuario normal, `false` en caso contrario.
 */
export const isUser = () => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) return false;

    try {
        const decodedToken = jwtDecode(accessToken);
        return decodedToken.role === 'user'; // Comprobar el rol en el token
    } catch (error) {
        console.error('Error al decodificar el token:', error);
        return false;
    }
};


/**
 * Obtiene el token de acceso almacenado.
 * @returns {string|null} El token de acceso o `null` si no existe.
 */
export const getAccessToken = () => {
    return localStorage.getItem('accessToken');
};


// // Función para obtener un nuevo accessToken
// export async function refreshAccessToken() {
//     try {
//         const response = await axios.post('/refresh-token', {}, { withCredentials: true });
//         const { accessToken } = response.data;

//         // Almacena el nuevo accessToken en el localStorage
//         storeAccessToken(accessToken);
//         console.log('[AuthUtils] New access token stored in localStorage:', accessToken);

//         // Devuelve el nuevo accessToken para continuar con las peticiones
//         return accessToken;
//     } catch (error) {
//         console.error('Error al renovar el token:', error);
//         throw new Error('No se pudo renovar el token');
//     }
// }


 
