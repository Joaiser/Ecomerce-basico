import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInterceptor';
import './contact-form.css';
import cookie from 'js-cookie';
import jwt_decode from 'jwt-decode';

export function Contact() {
    const initialMessageState = {
        nickname: cookie.get('username'),
        email: '',
        message: ''
    };

    const [message, setMessage] = useState(initialMessageState);
    const [responseMessage, setResponseMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        const storedAccessToken = localStorage.getItem('accessToken');
        if (storedAccessToken) {
            try {
                const decodedToken = jwt_decode(storedAccessToken);
                setMessage(prevState => ({ ...prevState, email: decodedToken.email }));
            } catch (error) {
                console.error('Error al decodificar el token:', error);
            }
        }
    }, []);

    const handleChange = (e) => {
        setMessage({
            ...message,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (message.nickname) { // Comprueba si el nombre de usuario existe
            try {
                const accessToken = localStorage.getItem('accessToken');
                const response = await axiosInstance.post('/contact/send', message, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
                if (response.data.success) {
                    setResponseMessage({ type: 'success', text: 'Mensaje enviado con éxito' });
                    setMessage(initialMessageState); // Restablece el mensaje
                } else {
                    // Aquí capturas el mensaje de error del servidor
                    setResponseMessage({ type: 'error', text: response.data.message });
                }
            } catch (error) {
                console.error(error);
                setResponseMessage({ type: 'error', text: 'Hubo un error al enviar el mensaje' });
            }
        } else {
            setResponseMessage({ type: 'error', text: 'Debes iniciar sesión para enviar un mensaje' });
        }
    };

    return (
        <section id='contact'>
            <h1>Contacto</h1>
            <div id='contact-center-form'>
                <div>
                    <h2>¿Tienes alguna duda?</h2>
                    <p>Si tienes alguna duda, sugerencia o problema, no dudes en ponerte en contacto con nosotros. Estamos aquí para ayudarte.</p>
                    <p>Correo electrónico: <a href="mailto:info@tusitio.com">aitorsergiojose.v@hotmail.com</a></p>
                </div>
                <div>
                    <h2>Formulario de contacto</h2>
                    {responseMessage.text && <p className={`message ${responseMessage.type}`}>{responseMessage.text}</p>}
                    <form onSubmit={handleSubmit}>
                        <label>
                            Nombre:
                            <input type="text" name="nickname" value={message.nickname} readOnly required className='dates'
                            placeholder={message.nickname ? message.nickname : 'Nombre'}/>
                        </label>
                        <label>
                            Email:
                            <input type="email" name="email" value={message.email} onChange={handleChange} readOnly className='dates' placeholder='Correo electrónico' required />
                        </label>
                        <label>
                            Mensaje:
                            <textarea name="message" value={message.message} onChange={handleChange} placeholder='Escribe aquí tu mensaje' className='dates' required></textarea>
                        </label>
                        <input type="submit" value="Enviar" id='sent-message'/>
                    </form>
                </div>
            </div>
        </section>
    );
}