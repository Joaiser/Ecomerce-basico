import React, { useState, useEffect, useRef,useLayoutEffect } from 'react';
import './init.css';

/*TO DO: Explicar porque he usado este hook en vez de useEffect, y explicar como he diseñado esta parte de web*/

export function Init() {
    const [data, setData] = useState([
       
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
     
    ]);
    
 
    const carouselRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        if (currentIndex < 3) {
            setCurrentIndex(currentIndex + 1.7);
        } else {
            setCurrentIndex(0); // Vuelve al inicio cuando llega al final
        }
    }

    const prevSlide = () => {
        if (currentIndex > 2) {
            setCurrentIndex(currentIndex - 1.5);
        } else {
            setCurrentIndex(0); 
        }
    }

    useLayoutEffect(() => {
        updateCarousel();
    }, [currentIndex]);

    const updateCarousel = () => {
        const slideWidth = carouselRef.current.children[0].getBoundingClientRect().width;
        const transformValue = -currentIndex * slideWidth;
        carouselRef.current.style.transform = `translateX(${transformValue}px)`;
    }


    return (
        <>
        <section id='presentation'>
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
        </section>
        </>
    )
}
