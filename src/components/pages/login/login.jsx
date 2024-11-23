import React, { useState } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';
import UserLogin from './userLogin.jsx';
import AdminLogin from './adminLogin.jsx';
import { storeAccessToken } from '../../../utils/authUtils.js';
import cookie from 'js-cookie';

function Login() {
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        setErrorMessage('');
        try {
            // Intentamos primero como usuario
            const userToken = await UserLogin(nickname, password);
            storeAccessToken(userToken); // Guarda el token en localStorage
            cookie.set('username', nickname, { expires: 7, secure: false });
            navigate('/'); // Redirigir a la página principal
        } catch (userError) {
            setErrorMessage(userError.message || 'Error desconocido.');

            try {
                // Si falla como usuario, intentamos como administrador
                const adminToken = await AdminLogin(nickname, password);
                storeAccessToken(adminToken); // Guarda el token de administrador
                cookie.set('username', nickname, { expires: 7, secure: false });
                navigate('/admin'); // Redirigir al panel de administración
            } catch (adminError) {
                setErrorMessage(adminError.message || 'Error desconocido.');
            }
        }
    };

    return (
        <main id="login-main">
            <form id="login-form">
                <h2 className="form-title">Iniciar sesión</h2>
                <label className="form-label">
                    Nickname
                    <input
                        type="text"
                        placeholder="Nickname"
                        value={nickname}
                        onChange={e => setNickname(e.target.value)}
                        className="form-input"
                    />
                </label>
                <label className="form-label">
                    Password
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="form-input"
                    />
                </label>
                <button type="button" onClick={handleLogin} className="form-button">
                    Iniciar sesión
                </button>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </form>
            
        </main>
    );
}

export default Login;
