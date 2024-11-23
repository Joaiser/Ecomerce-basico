import axios from 'axios';
import { storeAccessToken } from '../../../utils/authUtils.js';

const AdminLogin = async (username, password) => {
    const adminData = { username, password };

    try {
        const response = await axios.post('http://localhost:3000/admins/login', adminData, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${'accessToken'}`,
            },
            withCredentials: true, // Permite enviar cookies con la solicitud
        });


        if (response.data.success) {
            storeAccessToken(response.data.accesToken); // Usa la función para guardar el token
            return response.data.accesToken; // Devuelve el token en caso de que sea necesario
        } else {
            throw new Error('Login fallido');
        }
    } catch (error) {
        error.message;
        throw new Error(error.response?.data?.message || 'Error desconocido');
    }
};

export default AdminLogin;
