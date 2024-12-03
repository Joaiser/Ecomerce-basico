import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './contest.css';
import Confetti from 'react-confetti';
import cookie from 'js-cookie';
import jwt_decode from 'jwt-decode';
import axiosInstance from '../../utils/axiosInterceptor';

export function Contest() {
    const [username, setUsername] = useState(null);
    const [isRegistered, setIsRegistered] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [winner, setWinner] = useState(null);
    const [showConfetti, setShowConfetti] = useState(false);

    const location = useLocation();

    useEffect(() => {
        if (winner) {
            setShowConfetti(true);
            const timer = setTimeout(() => {
                setShowConfetti(false);
            }, 10000);

            return () => clearTimeout(timer);
        }
    }, [winner]);

    useEffect(() => {
        const storedAccessToken = localStorage.getItem('accessToken');
        if (storedAccessToken) {
            try {
                const decodedToken = jwt_decode(storedAccessToken);
                setUsername(cookie.get('username'));
                setIsAdmin(decodedToken.role === 'admin');
            } catch (error) {
                console.error('Error al decodificar el token:', error);
                setErrorMessage('Error en la autenticación. Por favor, inicia sesión nuevamente.');
            }
        }
    }, []);

    const handleRegister = async () => {
        setErrorMessage(null);
        setSuccessMessage(null);
        try {
            const response = await axiosInstance.post('http://localhost:3000/contestants/register', {
                username
            });

            if (response.data.success) {
                setIsRegistered(true);
                setSuccessMessage('¡Registro exitoso! Ahora estás participando en el concurso.');
            } else {
                throw new Error(response.data.message || 'El nombre de usuario ya está registrado en el concurso.');
            }
        } catch (error) {
            setErrorMessage(error.response?.data?.message || 'Hubo un problema con tu registro.');
        }
    };

    const handleSelectWinner = async () => {
        setErrorMessage(null);
        setSuccessMessage(null);
        try {
            const response = await axiosInstance.get('http://localhost:3000/contestants');

            if (response.data.length === 0) {
                throw new Error('No hay participantes en el concurso.');
            }
            const selectedWinner = response.data[Math.floor(Math.random() * response.data.length)];
            setWinner(selectedWinner);
            setSuccessMessage(`¡El ganador es ${selectedWinner.username}! 🎉`);
        } catch (error) {
            setErrorMessage(error.response?.data?.message || 'Hubo un error al obtener la lista de participantes.');
        }
    };

    return (
        <section id="concurso">
            <h1>Bienvenido al concurso para ganar un PC Gaming</h1>
            <img
                src="static/img/imgrecomended/1582-pccom-ready-amd-ryzen-5-5600x-16gb-1tb-ssd-rtx-4060-comprar.webp"
                alt="Imagen del PC Gaming"
            />
            <p>Este es un increíble PC Gaming con las siguientes características:</p>
            <ul>
                <li>Procesador: Intel Core i7</li>
                <li>RAM: 16GB</li>
                <li>Almacenamiento: 1TB SSD</li>
                <li>Gráficos: NVIDIA GeForce RTX 3080</li>
                <li>Y mucho más...</li>
            </ul>
            {!username && (
                <Link to={{ pathname: '/login', state: { from: location } }}>
                    <p>Por favor, inicia sesión para participar en el concurso.</p>
                </Link>
            )}
            {username && !isRegistered && (
                <button onClick={handleRegister}>Inscribirse en el concurso</button>
            )}
            {username && isRegistered && (
                <p>¡{username}, estás inscrito en el concurso! ¡Buena suerte!</p>
            )}
            {isAdmin && (
                <button onClick={handleSelectWinner}>Seleccionar ganador</button>
            )}
            {winner && (
                <>
                    {showConfetti && <Confetti />}
                    <p style={{color:'green'}}>¡El ganador es: {winner.username}! 🎉</p>
                </>
            )}
            {errorMessage && <p className="error">{errorMessage}</p>}
        </section>
    );
}