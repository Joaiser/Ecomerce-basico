import React, { useState } from 'react';
import axios from 'axios';
import './login.css';

export function LoginPage () {
  const [Nickname, setNickname] = useState('');
  const [Password_clientes, setPassword] = useState('');
  const [users_correo, setEmail] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); 
  const [validationErrors, setValidationErrors] = useState({}); // Nuevo estado para los errores de validación

  const validateForm = () => {
    const errors = {};
    if (!Nickname) errors.Nickname = 'El nickname es requerido';
    if (!Password_clientes) errors.Password_clientes = 'La contraseña es requerida';
    if (isRegistering) {
      if (!users_correo) errors.users_correo = 'El correo electrónico es requerido';
      if (Password_clientes && Password_clientes.length < 8) errors.Password_clientes = 'La contraseña debe tener al menos 8 caracteres';
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return; // Agregado para validar el formulario antes de enviar la solicitud
  
    setErrorMessage(''); // Restablecer el mensaje de error
  
    // Crear un objeto con los datos del formulario
    const userData = {
      Nickname: Nickname,
      Password_clientes: Password_clientes
    };
  
    // Hacer una solicitud POST al servidor
    try {
      const response = await fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
  
      // Verificar si la solicitud fue exitosa
      if (response.ok) {
        const data = await response.json();
        // Guardar el token en el almacenamiento local
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('username', Nickname);
        window.location.href = '/';
      } else {
        setErrorMessage('Datos incorrectos, por favor intenta de nuevo.'); 
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };
  
  const handleRegister = async () => {
    if (!validateForm()) return; // Agregado para validar el formulario antes de enviar la solicitud
  
    // Restablecer el mensaje de error
    setErrorMessage('');
  
    try {
      const response = await axios.post('http://localhost:3000/users/create', {
        Nickname,
        Password_clientes,
        users_correo
      });
      if (response.data) {
        // Guardar el token en el almacenamiento local
        localStorage.setItem('authToken', response.data.token);
        setIsRegistering(false); // Redirige al usuario a la página de inicio de sesión
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };
  
  const switchToRegister = () => {
    setIsRegistering(true);
    setErrorMessage(''); // Restablecer el mensaje de error
  };
  
  const switchToLogin = () => {
    setIsRegistering(false);
    setErrorMessage(''); // Restablecer el mensaje de error
  };
  
  return (
    <main id="login-main">
      {isRegistering ? (
        <form id="register-form">
          <h2 className="form-title">Crear una cuenta</h2>
          <label className="form-label">
            Nickname
            <input type="text" placeholder="Nickname" value={Nickname} onChange={e => setNickname(e.target.value)} required className='form-input'/>
            {validationErrors.Nickname && <p className="error-message">{validationErrors.Nickname}</p>} {/* Agregado para mostrar el error de validación */}
          </label>
          <label className="form-label">
            Password
            <input type="password" placeholder="Password" value={Password_clientes} required onChange={e => setPassword(e.target.value)}
             className='form-input'/>
            {validationErrors.Password_clientes && <p className="error-message">{validationErrors.Password_clientes}</p>} {/* Agregado para mostrar el error de validación */}
          </label>
          <label className="form-label">
            Correo electrónico
            <input type="email" placeholder="Correo electrónico" value={users_correo} required onChange={e => setEmail(e.target.value)} 
            className='form-input'/>
            {validationErrors.users_correo && <p className="error-message">{validationErrors.users_correo}</p>} {/* Agregado para mostrar el error de validación */}
          </label>
          <button type="button" onClick={handleRegister} className="form-button">Crear cuenta</button>
          <p className="form-switch">¿Ya tienes una cuenta? <button type="button" onClick={switchToLogin} className="form-switch-button">Iniciar sesión</button></p>
          {errorMessage && <p className="error-message">{errorMessage}</p>} 
        </form>
      ) : (
        <form id="login-form">
          <h2 className="form-title">Iniciar sesión</h2>
          <label className="form-label">
            Nickname
            <input type="text" placeholder="Nickname" required value={Nickname} onChange={e => setNickname(e.target.value)} 
            className='form-input'/>
            {validationErrors.Nickname && <p className="error-message">{validationErrors.Nickname}</p>} {/* Agregado para mostrar el error de validación */}
          </label>
          <label className="form-label">
            Password
            <input type="password" placeholder="Password" required value={Password_clientes} onChange={e => setPassword(e.target.value)}
             className='form-input'/>
            {validationErrors.Password_clientes && <p className="error-message">{validationErrors.Password_clientes}</p>} {/* Agregado para mostrar el error de validación */}
          </label>
          <button type="button" onClick={handleLogin} className="form-button">Iniciar sesión</button>
          <p className="form-switch">¿No tienes una cuenta? <button type="button" onClick={switchToRegister} className="form-switch-button">Crear cuenta</button></p>
          {errorMessage && <p className="error-message">{errorMessage}</p>} 
        </form>
      )}
    </main>
  );
}
  export default LoginPage;