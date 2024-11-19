import axios from 'axios';
import { storeAccessToken, clearAccessToken } from './authUtils';

// Crear una instancia de Axios
const apiClient = axios.create({
    baseURL: 'http://localhost:3000', // Cambia según tu configuración
    withCredentials: true, // Permitir cookies para el refreshToken
});

// Interceptor para manejar respuestas
apiClient.interceptors.response.use(
    response => response, // Si no hay error, devolver la respuesta tal cual
    async (error) => {
        const originalRequest = error.config;

        // Si el accessToken ha expirado
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                // Solicitar un nuevo accessToken
                const refreshResponse = await axios.post('/token/refresh', {}, { withCredentials: true });
                const newAccessToken = refreshResponse.data.accessToken;

                // Guardar el nuevo token utilizando authUtils
                storeAccessToken(newAccessToken);

                // Actualizar el encabezado Authorization
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                
                // Reintentar la solicitud original con el nuevo token
                return apiClient(originalRequest);
            } catch (refreshError) {
                console.error('Error al refrescar el token:', refreshError);
                clearAccessToken(); // Limpiar el token de acceso en caso de error
                window.location.href = '/login'; // Redirigir al login si falla el refreshToken
            }
        }

        return Promise.reject(error);
    }
);

export default apiClient;
