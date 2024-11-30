import axios from 'axios';
import { storeAccessToken } from './authUtils.js';

// Crea una instancia de Axios
const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000', // Ajusta el URL base de tu API
});

// Agrega un interceptor para manejar respuestas 401
axiosInstance.interceptors.response.use(
    response => response, // Devuelve la respuesta si no hay errores
    async error => {
        const originalRequest = error.config;

        // Verifica si es un error 401 y si no se ha intentado ya regenerar el token
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // Marca el intento para evitar bucles infinitos

            try {
                // Llama a la ruta de refresco de token
                const response = await axiosInstance.post('/refreshtoken', {}, {
                    withCredentials: true, // Asegúrate de enviar las cookies
                });

                const newAccessToken = response.data.accessToken;

                // Guarda el nuevo accessToken en localStorage
                storeAccessToken(newAccessToken);

                // Actualiza el header de autorización del request original
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

                // Reintenta la solicitud original
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error); // Devuelve otros errores sin modificar
    }
);

export default axiosInstance;
