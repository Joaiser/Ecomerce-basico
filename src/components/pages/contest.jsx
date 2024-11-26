import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './contest.css';
import Confetti from 'react-confetti';
import cookie from 'js-cookie';
import jwt_decode from 'jwt-decode';

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
            const response = await fetch('http://localhost:3000/contestants/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
                body: JSON.stringify({ username }),
            });

            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    setIsRegistered(true);
                    setSuccessMessage('¡Registro exitoso! Ahora estás participando en el concurso.');
                } else {
                    throw new Error(data.message || 'El nombre de usuario ya está registrado en el concurso.');
                }
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Hubo un problema con tu registro.');
            }
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    const handleSelectWinner = async () => {
        setErrorMessage(null);
        setSuccessMessage(null);
        try {
            const response = await fetch('http://localhost:3000/contestants', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                if (data.length === 0) {
                    throw new Error('No hay participantes en el concurso.');
                }
                const selectedWinner = data[Math.floor(Math.random() * data.length)];
                setWinner(selectedWinner);
                setSuccessMessage(`¡El ganador es ${selectedWinner.username}! 🎉`);
            } else {
                throw new Error('Hubo un error al obtener la lista de participantes.');
            }
        } catch (error) {
            setErrorMessage(error.message);
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
