import React, { useState } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';
import UserLogin from './userLogin.jsx';
import AdminLogin from './adminLogin.jsx';
import cookie from 'js-cookie';

function Login() {
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [accessToken, setAccessToken] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async () => {
        setErrorMessage('');
        try {
            // Intentamos primero como usuario
            const userToken = await UserLogin(nickname, password);
            // Almacenamos el token y el nombre de usuario en cookies
            cookie.set('accessToken', userToken, { expires: 1, secure: false });
            cookie.set('username', nickname, { expires: 1, secure: false });
            navigate('/'); // Redirigir a la página principal
        } catch (userError) {
            setErrorMessage(userError.message || 'Error desconocido.');

            try {
                // Si falla como usuario, intentamos como administrador
                const adminToken = await AdminLogin(nickname, password);
                // Guardamos el admin token y username en cookies
                cookie.set('accessToken', accessToken, { expires: 1, secure: false });
                cookie.set('username', nickname, { expires: 7, secure: false });                
                // Verifica si es admin y redirige al panel de administración
                navigate('/admin'); 
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
