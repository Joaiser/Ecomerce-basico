import axios from 'axios';

export const verifyToken = async () => {
    try {
        // Asegúrate de que la URL esté bien configurada para tu servidor (ajustar si es necesario)
        const response = await axios.get('http://localhost:3000/verify', {
            withCredentials: true, // Esto asegura que las cookies se envíen con la solicitud
        });
        return response.data; // Devuelve si el usuario está autenticado y su rol
    } catch (error) {
        console.error('Error verifying token:', error);
        return null; // Si la verificación falla, retornamos null o un valor que indique no autenticado
    }
};
