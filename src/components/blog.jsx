import { useState, useRef, useLayoutEffect } from 'react';
import './blog.css';
import { useCarousel as useCarouselFromHooks } from '../hooks/carrousel';

export const useCarousel = (initialIndex = 0) => {
    const carouselRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(initialIndex);

    const nextSlide = () => {
        if (currentIndex < 5) { 
            setCurrentIndex(currentIndex + 1);
        } else {
            setCurrentIndex(0); // Vuelve al inicio cuando llega al final
        }
    }
    
    const prevSlide = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        } else {
            setCurrentIndex(5); // Vuelve al final cuando llega al inicio
        }
    }

    useLayoutEffect(() => {
        const updateCarousel = () => {
            const slideWidth = carouselRef.current.children[0].getBoundingClientRect().width;
            const transformValue = -currentIndex * slideWidth;
            carouselRef.current.style.transform = `translateX(${transformValue}px)`;
        }
        updateCarousel();
    }, [currentIndex]);

    return { carouselRef, nextSlide, prevSlide };
}

export function Blog() {
    const { carouselRef, nextSlide, prevSlide } = useCarouselFromHooks();
    const articles = [
        { title: 'Diferencias entre pantallas OLED, AMOLED, QLED y NanoCell: ¿cuál es mejor',
          content: 'En este artículo te explicamos las diferencias entre las tecnologías de pantallas OLED, AMOLED, QLED y NanoCell, y te ayudamos a elegir la mejor para ti.', 
         imgSrc: 'static/img/tipos-de-pantallas.webp',
          link: '#' },
        { title: '¿Qué es una placa base y cuál es su función?',
         content: '¿Qué es una placa base y cuál es su función? En este artículo te explicamos todo lo que necesitas saber sobre este componente esencial de tu ordenador.', 
         imgSrc: 'static/img/que-es-placa-base.webp',
          link: '#' },
        { title: 'Diferencias y tipos de switch de teclado mecánico: ¿Cuál es mejor para ti?',
         content: 'En este artículo te explicamos las diferencias entre los distintos tipos de switch de teclado mecánico, y te ayudamos a elegir el mejor para ti.', 
         imgSrc: 'static/img/tecladoswitchblue.webp',
          link: '#'},
        { title: 'Las mejores sillas erogonómicas para trabajar desde casa',
          content: 'En este artículo te recomendamos las mejores sillas ergonómicas para trabajar desde casa, y te explicamos cómo elegir la mejor para ti.', 
          imgSrc: 'static/img/sillas-ergonomicas-1.webp',
          link: '#'},
        { title: 'Cómo trabjar con dos pantallas a la vez conectadas a un portátil',
          content: 'En este artículo te explicamos cómo trabajar con dos pantallas a la vez conectadas a un portátil, y te damos algunos consejos para ser más productivo.', 
          imgSrc: 'static/img/monitores-para-trabajar.webp',
          link: '#'},
        { title: 'Las mejores sillas gamimg de alta gama',
          content: 'En este artículo te recomendamos las mejores sillas gaming de alta gama, y te explicamos cómo elegir la mejor para ti.', 
          imgSrc: 'static/img/mejores-sillas-gaming.webp',
          link: '#'}
    ];

    return (
        <section>
            <h1>Nuestro Blog</h1>
            <div id='carousel-container'>
                <div id='section-center' ref={carouselRef}>
                    {articles.map((article, index) => (
                        <article key={index}>
                            <a href={article.link}>
                                <img src={article.imgSrc} alt={article.title} />
                                <div>
                                    <h2>{article.title}</h2>
                                    <p>{article.content}</p>
                                    <a href={article.link}>Leer más</a>
                                </div>
                            </a>
                        </article>
                    ))}
                </div>
                <div id='buttons'>
                    <button className="carousel-button-blog" onClick={prevSlide}>←</button>
                    <button className="carousel-button-blog" onClick={nextSlide}>→</button>
                </div>
            </div>
        </section>
    );
}