import React from 'react';
import './init.css';
import { useCarousel } from '../hooks/carrousel';

export function Init() {
    const { carouselRef, nextSlide, prevSlide } = useCarousel();

    const data = [
        {
            src: '/static/img/ofertas-especiales.webp',
            description: 'Ofertas especiales'
        },
        {
            src: '/static/img/reacondicionadosimg.webp',
            description: 'Reacondicionados'
        },
        {
            src: '/static/img/concursos.webp',
            description: 'concursos'
        },
        {
            src: '/static/img/blog.webp',
            description: 'Blog'
        },
        {
            src: '/static/img/novedades.webp',
            description: 'Novedades'
        },
        {
            src: '/static/img/pccom.webp',
            description: 'Pccom'
        },
        {
            src: '/static/img/ranking.webp',
            description: 'Ranking'
        },
        {
            src: '/static/img/servicios.webp',
            description: 'Servicios'
        },
    ];

    return (
        <>
        <section id='presentation'>
        <h1>¡Bienvenido a la tienda!</h1>
        <p>En nuestra tienda encontrarás una amplia variedad de productos informáticos, tanto nuevos como de segunda mano. ¡Esperamos que encuentres lo que buscas!</p>
        <p>Si tienes alguna pregunta, no dudes en contactar con nosotros.</p>
        
        <div id='section-init'>
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