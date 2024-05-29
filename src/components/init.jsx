import React, { useState, useEffect } from 'react';
import './init.css';
import { useCarousel } from '../hooks/carrousel';

export function Init() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/api/images')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la petición');
                }
                return response.json();
            })
            .then(data => {
                setData(data);
                console.log(data); // Aquí
            })
            .catch(error => console.error(error));
    }, []);

    const { carouselRef, nextSlide, prevSlide } = useCarousel(data.length);

    return (
        <>
        <section id='presentation'>
        <h1>¡Bienvenido a la tienda!</h1>
        <h2><a href="">Participa en nuestro concurso para ganar un PC Gaming</a></h2>
        
        <div id='section-init-center'>
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
                <article id='carusell-article'>
                    <div ref={carouselRef} id='div-carusell'>
                        {data.map((item, i) => (
                            <div key={i} className="slide">
                                <a href="#">
                                    <img className="prueba" src={item.src} alt={`Slide ${i + 1}`} />
                                    <p className="legend">{item.description}</p>
                                </a>
                            </div>
                        ))}
                    </div>
                    <div id='buttons'>
                        <button className="carousel-button" onClick={prevSlide}>←</button>
                        <button className="carousel-button" onClick={nextSlide}>→</button>
                    </div>
                </article>
            </div>
        </section>
        </>
    )
}