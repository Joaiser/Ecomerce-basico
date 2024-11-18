import axios from 'axios';

const UserLogin = async (username, password) => {
    const userData = { username, password };

    try {
        const response = await axios.post('http://localhost:3000/users/login', userData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.data?.userId) {
            localStorage.setItem('Id_cliente', response.data.userId);
            return response.data;
        } else {
            throw new Error('Usuario no encontrado');
        }
    } catch (error) {
        console.error('[UserLogin] Error:', error.response?.data || error.message);
        throw error;
    }
};


export default UserLogin;
