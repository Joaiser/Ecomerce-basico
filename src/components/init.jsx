import React, { useState, useEffect, useRef } from 'react';
import './init.css';

export function Init() {
    const [data, setData] = useState([]);
    const carouselRef = useRef(null);
    let currentIndex = 0;

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://source.unsplash.com/random');
            const url = response.url;

            const newData = Array(9).fill().map((_, index) => ({
                src: `${url}?${index}`,
                description: `Descripción ${index + 1}`
            }));

            setData(newData);
        };

        fetchData();
    }, []);

    const nextSlide = () => {
        if (currentIndex < data.length - 1) {
            currentIndex++;
            updateCarousel();
        }
    }

    const prevSlide = () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    }

    const updateCarousel = () => {
        const transformValue = -currentIndex * 300; // 300 es el ancho de cada slide
        carouselRef.current.style.transform = `translateX(${transformValue}px)`;
    }

    return (
        <>
        <section>
        <h1>¡Bienvenido a la tienda!</h1>
        <p>En nuestra tienda encontrarás una amplia variedad de productos informáticos, tanto nuevos como de segunda mano. ¡Esperamos que encuentres lo que buscas!</p>
        <p>Si tienes alguna pregunta, no dudes en contactar con nosotros.</p>
        </section>
        <section id='section-init'>
            <article id='images-init'>
                <div>
                    <a href=""><img src="" alt="Imagen de portatiles" /></a>
                </div>
                <div><a href=""><img src="" alt="Imagen de componentes PC" /></a></div>
                <div><a href=""><img src="" alt="Imagen de TV y audio" /></a></div>
                <div><a href=""><img src="" alt="Imagen de smartphones" /></a></div>
                <div><a href=""><img src="" alt="Imagen de electrodomesticos" /></a></div>
                <div><a href=""><img src="" alt="Imagen de ofertas" /></a></div>
            </article>
            <article>
                <div ref={carouselRef} style={{display: 'flex', overflow: 'hidden', width: '300px'}}>
                    {data.map((item, i) => (
                        <div key={i} style={{width: '300px'}}>
                            <a href="#">
                                <img className="prueba" src={item.src} alt={`Slide ${i + 1}`} />
                                <p className="legend">{item.description}</p>
                            </a>
                        </div>
                    ))}
                </div>
                <button onClick={prevSlide}>Anterior</button>
                <button onClick={nextSlide}>Siguiente</button>
            </article>
        </section>
        </>
    )
}