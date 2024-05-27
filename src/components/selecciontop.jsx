import { Link } from 'react-router-dom';
import './selecciontop.css';
import { useState, useRef, useLayoutEffect,useEffect } from 'react';


export const useCarousel = (productsToShow, initialIndex = 0) => {
    const carouselRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(initialIndex);

    const nextSlide = () => {
        if (currentIndex < productsToShow.length - 1) { 
            setCurrentIndex(currentIndex + 1); 
        } else {
            setCurrentIndex(0); 
        }
    }
    
    const prevSlide = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        } else {
            setCurrentIndex(productsToShow.length - 1);
        }
    }
    

    useLayoutEffect(() => {
        const updateCarousel = () => {
            if (carouselRef.current && carouselRef.current.children[0]) {
                const slideWidth = carouselRef.current.children[0].getBoundingClientRect().width;
                const transformValue = -currentIndex * slideWidth * 0.8;
                carouselRef.current.style.transform = `translateX(${transformValue}px)`;
                carouselRef.current.style.transition = 'transform 0.5s ease-in-out'; // Agrega esta línea
            }
        }
        updateCarousel();
    }, [currentIndex]);

    return { carouselRef, nextSlide, prevSlide };
}


export function SelectionTop(){
    const [selectedCategory, setSelectedCategory] = useState('Ordenadores');
    const [productsToShow, setProductsToShow] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/products')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                const productsWithImageUrls = data.map(product => {
                    const asciiCodes = product.imagen_producto.data;
                    const imageUrl = asciiCodes.map(code => String.fromCharCode(code)).join('');
                    return { ...product, image: imageUrl };
                });
                console.log(productsWithImageUrls);
                setProductsToShow(productsWithImageUrls);
            })
            .catch(error => console.error('Error:', error));
    }, []);
    const { carouselRef, nextSlide, prevSlide } = useCarousel(productsToShow);

    function handleCategoryClick(category, event) {
        event.preventDefault();
        setSelectedCategory(category);
    }

    return(
        <section className="container">
            <div className='container-center'>
                <aside className='aside-container'>
                    <h2>Seleccion Top</h2>
                    <p>Tus productos favoritos de tecnología con ofertas y descuentos increíbles.</p>
                    <Link to={"/productos"}>Ver más</Link>
                </aside>
                <article className="content">
                    <ul>
                        <li>
                            <a href="#" className={selectedCategory === 'Ordenadores' ? 'selected' : ''} onClick={(event) => handleCategoryClick('Ordenadores', event)}>
                                Ordenadores
                            </a>
                        </li>
                        <li>
                            <a href="#" className={selectedCategory === 'Componentes' ? 'selected' : ''} onClick={(event) => handleCategoryClick('Componentes', event)}>
                                Componentes
                            </a>
                        </li>
                        <li>
                            <a href="#" className={selectedCategory === 'Móviles' ? 'selected' : ''} onClick={(event) => handleCategoryClick('Móviles', event)}>
                                Móviles
                            </a>
                        </li>
                        <li>
                            <a href="#" className={selectedCategory === 'Televisores' ? 'selected' : ''} onClick={(event) => handleCategoryClick('Televisores', event)}>
                                Televisores
                            </a>
                        </li>
                        <li>
                            <a href="#" className={selectedCategory === 'Hogar tech' ? 'selected' : ''} onClick={(event) => handleCategoryClick('Hogar tech', event)}>
                                Hogar tech
                            </a>
                        </li>
                    </ul>
                    <div id='carousel-container-seleccion'>
                        <div id='section-center-seleccion' ref={carouselRef}>
                        {productsToShow.filter(product => product.Genero === selectedCategory || selectedCategory === 'Todos').map((product, index, self) => (
    <article key={index}>
        <a href={product.link}>
            <img src={product.image} alt={product.Nombre || ''} />
        </a>
        {self.length - 1 === index || (product.Nombre && product.precio) ? (
            <div>
                <h2>{product.Nombre || ''}</h2>
                <p>{product.precio ? `Precio: ${product.precio}€` : ''}</p>
                <a href={product.link}>Leer más</a>
            </div>
        ) : (
            <div style={{height: 'auto', marginBottom:'120px'}}></div>
        )}
    </article>
))}
                        </div>
                        <div id='button-center'>
                            <button className="carousel-button-seleccion" onClick={prevSlide}>←</button>
                            <button className="carousel-button-seleccion" onClick={nextSlide}>→</button>
                        </div>
                    </div>
                </article>
            </div>
        </section>
    )   
}