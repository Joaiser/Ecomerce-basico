import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './contest.css';
import Confetti from 'react-confetti';

export function Contest() {
    const [username, setUsername] = useState(null);
    const [isRegistered, setIsRegistered] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false); 
    const [winner, setWinner] = useState(null); 
    const [showConfetti, setShowConfetti] = useState(false); 

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
        const storedUsername = localStorage.getItem('username');
        const isAdmin = localStorage.getItem('isAdmin') === 'true';
        setUsername(storedUsername);
        setIsAdmin(isAdmin);
    }, []);

    const handleRegister = async () => {
        try {
            const response = await fetch('http://localhost:3000/contestants/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username }),
            });
            
            if (response.headers.get('content-type').includes('application/json')) {
                const data = await response.json();
                if (data.success) {
                    setIsRegistered(true);
                    setErrorMessage('¡Registro exitoso!');
                } else {
                    throw new Error('El nombre de usuario ya está registrado en el concurso');
                }
            } else {
                throw new Error('El nombre de usuario ya está registrado en el concurso');
            }
        } catch (error) {
            setErrorMessage(error.message);
        }
    };
    const handleSelectWinner = async () => {
        try {
            const response = await fetch('http://localhost:3000/contestants', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            console.log('Respuesta del servidor:', response); // Añade este registro
    
            if (response.headers.get('content-type').includes('application/json')) {
                const data = await response.json();
                console.log('Datos del servidor:', data); // Añade este registro
            
                if (data.length === 0) {
                    throw new Error('No hay participantes en el concurso');
                }
            
                // Selecciona un ganador al azar de la lista de participantes
                const winner = data[Math.floor(Math.random() * data.length)];
                setWinner(winner);
            } else {
                throw new Error('Hubo un error al obtener la lista de participantes');
            
            }
        } catch (error) {
            console.error('Error:', error); // Añade este registro
            setErrorMessage(error.message);
        }
    };

    return (
        <section id='concurso'>
            <h1>Bienvenido al concurso para ganar un pc Gaming</h1>
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
                <Link to={{ pathname: "/login", state: { from: location } }}>
                    <p>Por favor, inicia sesión para participar en el concurso.</p>
                </Link>
            )}
            {username && !isRegistered && (
                <button onClick={handleRegister}>Inscribirse en el concurso</button>
            )}
            {username && isRegistered && (
                <p>¡{username}, estás inscrito en el concurso! ¡Buena suerte!</p>
            )}
            {username && isAdmin && (
                <button onClick={handleSelectWinner}>Seleccionar ganador</button>
            )}
            {winner && (
                <>
                    {showConfetti && <Confetti />} 
                    <p>¡El ganador es: {winner.username}! 🎉</p>
                </>
            )}
            {errorMessage && (
                <p>{errorMessage}</p>
            )}
        </section>
    )
}