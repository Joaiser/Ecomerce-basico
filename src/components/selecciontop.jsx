
import { useState, useRef, useLayoutEffect } from 'react';
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


export function SelectionTop(){
    const { carouselRef, nextSlide, prevSlide } = useCarousel();
    const articles = [
        // Agrega algunos objetos de prueba para verificar si el carrusel se renderiza correctamente
        { link: "#", imgSrc: "ruta/a/tu/imagen.jpg", title: "Título del artículo", content: "Contenido del artículo" },
        // Agrega más objetos de artículo aquí...
    ];

    return(
        <section>
           <aside>
            <h2>Seleccion Top</h2>
            <p>Tus productos favoritos de tecnología 
                con ofertas y descuentos increíbles.
            </p>
            <a href="">Ver más</a>
           </aside>
           <article>
            <ul>
                <li><a href="">Ordenadores</a></li>
                <li><a href="">Componentes</a></li>
                <li><a href="">Móviles</a></li>
                <li><a href="">Televisores</a></li>
                <li><a href="">Hogar tech</a></li>
            </ul>
            <div id='carousel-container'>
            <div id='section-center' ref={carouselRef}>
            {articles.map((article, index) => (
                <article key={index}>
                    <a href={article.link}>
                        <img src={article.imgSrc} alt={article.title} /> {/* Corregido aquí */}
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
           </article>
        </section>
    )   
}