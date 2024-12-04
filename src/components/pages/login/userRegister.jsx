import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css'; // Usamos los mismos estilos que en login

export const UserRegister = () => {
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const userData = {
            Nickname: nickname,
            Password_clientes: password,
            users_correo: email,
        };

        try {
            const response = await axios.post('http://localhost:3000/users/create', userData);
            setSuccess(response.data.message || 'Usuario registrado con éxito.');
            setNickname('');
            setEmail('');
            setPassword('');
            // Redirigir al login después de registrarse
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            if (err.response && err.response.data) {
                setError(err.response.data.message || 'Error inesperado al registrarse.');
            } else {
                setError('Error de conexión.');
            }
        }
    };

    return (
        <main id="login-main">
            <form id="register-form" onSubmit={handleRegister}>
                <h2 className="form-title">Crear Cuenta</h2>
                <label className="form-label">
                    Nombre de Usuario
                    <input
                        type="text"
                        placeholder="Nombre de Usuario"
                        value={nickname}
                        onChange={e => setNickname(e.target.value)}
                        className="form-input"
                        required
                    />
                </label>
                <label className="form-label">
                    Correo Electrónico
                    <input
                        type="email"
                        placeholder="Correo Electrónico"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="form-input"
                        required
                    />
                </label>
                <label className="form-label">
                    Contraseña
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="form-input"
                        required
                    />
                </label>
                <button type="submit" className="form-button">
                    Registrarse
                </button>
                {success && <p className="success-message">{success}</p>}
                {error && <p className="error-message">{error}</p>}
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <p>¿Ya tienes una cuenta?</p>
                    <button
                        type="button"
                        className="form-switch-button"
                        onClick={() => navigate('/login')}
                    >
                        Iniciar Sesión
                    </button>
                </div>
            </form>
        </main>
    );
};

