import { useEffect, useState } from 'react';
import { useCarousel } from '../hooks/carrousel';
import './weekrecomended.css';
import { Link } from 'react-router-dom';

export function WeekRecomended() {
    const [products, setProducts] = useState([]);
    const { carouselRef, nextSlide, prevSlide } = useCarousel(products.length);

    useEffect(() => {
        fetch('http://localhost:3000/productos/recomendados')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                const productsWithImageUrls = data.map(product => {
                    const asciiCodes = product.imagen.data;
                    const imageUrl = asciiCodes.map(code => String.fromCharCode(code)).join('');
                    return { ...product, imagen: { data: imageUrl } };
                });
                setProducts(productsWithImageUrls);
            })
            .catch(error => console.error('Error:', error));
    }, []);

    return(
        <section id='week-recomended-container'>
          <div id='week-recomended-container-center'>
            <h1>Recomendación de la semana</h1>
            <article id='carusell-article-week-recomended'>
                    <div ref={carouselRef} id='div-carusell-week-recomended'>
                        {products.map((item, i) => (
                            <div key={item.id_producto} className="slide-week-recomended">
                                <Link to={`/productos/recomendados/${item.id_producto}`} className='link-to-product'>
                                    <img className="img-week-recomended" src={item.imagen.data} alt={`Slide ${i + 1}`} />
                                    <p className="legend">{item.descripcion}</p>
                                    <span className='price'>Precio: {item.precio}</span>
                                    <span className='shipping'>{item.envio}</span>
                                    <span className='shipping-date'>{item.fechaEnvio}</span>
                                </Link>
                                    
                            </div>
                        ))}
                    </div>
                    <div id='buttons'>
                        <button className="carousel-button-week-recomended" onClick={prevSlide}>←</button>
                        <button className="carousel-button-week-recomended" onClick={nextSlide}>→</button>
                    </div>
                </article>
         </div>
        </section>
    )
}