import axios from 'axios';
import { storeAccessToken } from '../../../utils/authUtils';

const UserLogin = async (username, password) => {
    const userData = { Nickname: username, Password_clientes: password };

    try {
        const response = await axios.post('http://localhost:3000/users/login', userData, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        });
        
        // Validamos si recibimos el token y el usuario
        if (response.data?.accessToken && response.data?.user) {
            const token = response.data.accessToken;
            storeAccessToken(token); 
            return token;
        } else {
            throw new Error('Inicio de sesión fallido: datos incompletos.');
        }
        
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error desconocido en el inicio de sesión.');
    }
};

export default UserLogin;