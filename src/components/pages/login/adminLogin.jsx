import axios from 'axios';

const AdminLogin = async (username, password) => {
    const adminData = { username, password };

    try {
        const response = await axios.post('http://localhost:3000/admins/login', adminData, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true, // Permite enviar cookies con la solicitud
        });

        console.log('Response from server:', response.data);

        if (response.data.success) {
            return response.data.token; // Retorna el token si el login es exitoso
        } else {
            throw new Error('Login fallido');
        }
    } catch (error) {
        console.error('[AdminLogin] Error:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Error desconocido');
    }
};

export default AdminLogin;
