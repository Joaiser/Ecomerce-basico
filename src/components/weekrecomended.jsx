import React, { useState } from 'react';
import { useCarousel } from '../hooks/carrousel';

export function WeekRecomended() {
    const { carouselRef, nextSlide, prevSlide } = useCarousel();

    const [data, setData] = useState([
        {
            src: '/static/img/reacondicionadosimg.webp',
            description: 'Reacondicionados',
            precio: '1000€',
            estrellas: 'aqui va una imagen de estrellas',
            envio: 'Envío gratis',
            fechaEnvio: 'Entrega en 6 días'
        },
        {
            src: '/static/img/concursos.webp',
            description: 'concursos',
            precio: '1000€',
            estrellas: 'aqui va una imagen de estrellas',
            envio: 'Envío gratis',
            fechaEnvio: 'Entrega en 5 días'
        },
        {
            src: '/static/img/blog.webp',
            description: 'Blog',
            precio: '1000€',
            estrellas: 'aqui va una imagen de estrellas',
            envio: 'Envío gratis',
            fechaEnvio: 'Entrega en 4 días'
        },
        {
            src: '/static/img/novedades.webp',
            description: 'Novedades',
            precio: '1000€',
            estrellas: 'aqui va una imagen de estrellas',
            envio: 'Envío gratis',
            fechaEnvio: 'Entrega en 3 días'
        },
        {
            src: '/static/img/pccom.webp',
            description: 'Pccom',
            precio: '1000€',
            estrellas: 'aqui va una imagen de estrellas',
            envio: 'Envío gratis',
            fechaEnvio: 'Entrega en 3 días'
        },
        {
            src: '/static/img/ranking.webp',
            description: 'Ranking',
            precio: '1000€',
            estrellas: 'aqui va una imagen de estrellas',
            envio: 'Envío gratis',
            fechaEnvio: 'Entrega en 2 días'
        },
        {
            src: '/static/img/servicios.webp',
            description: 'Servicios',
            precio: '1000€',
            estrellas: 'aqui va una imagen de estrellas',
            envio: 'Envío gratis',
            fechaEnvio: 'Entrega en 1 día'
        },
    ]);

    return(
        <section>
            <h1>Recomendación de la semana</h1>
            <article id='carusell-article'>
                    <div ref={carouselRef} id='div-carusell'>
                        {data.map((item, i) => (
                            <div key={i} className="slide">
                                <a href="#"> {/*arreglar el a href*/}
                                    <img className="prueba" src={item.src} alt={`Slide ${i + 1}`} />
                                    <p className="legend">{item.description}</p>
                                    <span className='price'>{item.precio}</span>
                                    <span className='stars'>{item.estrellas}</span>
                                    <span className='shipping'>{item.envio}</span>
                                    <span className='shipping-date'>{item.fechaEnvio}</span>
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
    )
}
