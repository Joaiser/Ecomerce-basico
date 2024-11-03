import React, { useState } from 'react';
import axios from 'axios';
import './login.css';

export function LoginPage () {
  const [Nickname, setNickname] = useState('');
  const [Password_clientes, setPassword] = useState('');
  const [users_correo, setEmail] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); 
  const [validationErrors, setValidationErrors] = useState({}); 

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
    if (!validateForm()) return; // Validar el formulario antes de enviar la solicitud
  
    setErrorMessage(''); // Restablecer el mensaje de error
  
    // Crear un objeto con los datos del formulario
    const userData = {
      Nickname: Nickname,
      Password_clientes: Password_clientes
    };

    // Para Administradores
    const adminData = {
      username: Nickname,
      password: Password_clientes
    };
  
    // Hacer una solicitud POST al servidor
    try {
      const response = await axios.post('http://localhost:3000/users/login', userData);
  
      // Guardar el token, el username y el Id_cliente en el almacenamiento local
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('username', Nickname);
      localStorage.setItem('Id_cliente', response.data.Id_cliente); // Asegúrate de que 'Id_cliente' es la clave correcta en la respuesta
      localStorage.setItem('isAdmin', 'false'); // Añade esta línea
      window.location.href = '/';
    } catch (error) {
      // Si el error es 'Usuario no encontrado', intentar iniciar sesión como administrador
      if (error.response.data.message === 'Usuario no encontrado') {
        try {
          const adminResponse = await axios.post('http://localhost:3000/admins/login', adminData);
  
          // Guardar el token, el username y el Id_administrador en el almacenamiento local
          localStorage.setItem('authToken', adminResponse.data.token);
          localStorage.setItem('username', Nickname);
          localStorage.setItem('Id_administrador', adminResponse.data.Id_administrador); // Asegúrate de que 'Id_administrador' es la clave correcta en la respuesta
          localStorage.setItem('isAdmin', 'true'); // Añade esta línea
          window.location.href = '/admin'; // Redirigir al usuario a la página de administrador
        } catch (adminError) {
          // Si el inicio de sesión como administrador también falla, mostrar el mensaje de error
          setErrorMessage(adminError.response.data.message);
        }
      } else {
        // Si el error no es 'Usuario no encontrado', mostrar el mensaje de error
        setErrorMessage(error.response.data.message);
      }
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
        // Guardar el token, el username y el Id_cliente en el almacenamiento local
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('username', Nickname);
        localStorage.setItem('Id_cliente', response.data.Id_cliente); // Asegúrate de que 'Id_cliente' es la clave correcta en la respuesta
        setIsRegistering(false); // Redirige al usuario a la página de inicio de sesión
      }
    } catch (error) {
      // Si el mensaje de error es 'El nombre de usuario ya existe' o 'El correo electrónico ya está en uso', mostrarlo al usuario
      if (error.response.data.message === 'El nombre de usuario ya existe') {
        setErrorMessage('El nombre de usuario ya existe');
      } else if (error.response.data.message === 'El correo electrónico ya está en uso') {
        setErrorMessage('El correo electrónico ya está en uso');
      } else {
        setErrorMessage(error.message);
      }
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