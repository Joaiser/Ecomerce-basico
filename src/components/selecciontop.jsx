import './selecciontop.css';
import { useState, useRef, useLayoutEffect } from 'react';


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
    const [selectedCategory, setSelectedCategory] = useState('Todos');
    const productsToShow = [
        {
            link: '/product/1',
            image: '/static/img/imgpc/1710-alurin-go-start-intel-pentium-n4020-8gb-256gb-ssd-156-comprar.webp',
            title: 'Ofertas especiales',
            price: '100€',
            category: 'Ordenadores'
        },
        {
            link: '/product/2',
            image: '/static/img/imgpc/198-lenovo-ideapad-1-15amn7-amd-ryzen-5-7520u-16-gb-512gb-ssd-156.webp',
            title: 'Reacondicionados',
            price: '200€',
            category: 'Ordenadores'
        },
        {
            link: '/product/3',
            image: '/static/img/imgpc/1703-msi-katana-15-b13vfk-1854xes-intel-core-i7-13700h-16gb-1tb-ssd-rtx-4060-156-fe60fb00-dc49-4c2d-be95-adde65888774.webp',
            title: 'Concursos',
            price: '300€',
            category: 'Ordenadores'
        },
        {
            link: '/product/4',
            image: '/static/img/imgpc/153-msi-thin-gf63-12uc-688xes-intel-core-i7-12650h-16gb-1tb-ssd-rtx-3050-156.webp',
            title: 'Blog',
            price: '400€',
            category: 'Ordenadores'
        },
        {
            link: '/product/5',
            image: '/static/img/imgpc/1389-asus-vivobook-15-f1504va-nj766w-intel-core-i7-1355u-16gb-1tb-ssd-156.webp',
            title: 'Novedades',
            price: '500€',
            category: 'Ordenadores'
        },
        {
            link: '/product/6',
            image: '/static/img/imgpc/1537-acer-aspire-3-a315-44p-amd-ryzen-7-5700u-16gb-512gb-ssd-156.webp',
            title: 'Pccom',
            price: '600€',
            category: 'Ordenadores'
        },
        {
            link: '/product/9',
            image: '/static/img/imgpc/1686-lenovo-ideapad-slim-3-15iah8-intel-core-i5-12450h-16gb-1tb-ssd-156.webp',
            title: 'Servicios',
            price: '800€',
            category: 'Ordenadores'
        },
        {
            link: '/product/10',
            image: '/static/img/imgpc/1703-msi-katana-15-b13vfk-1854xes-intel-core-i7-13700h-16gb-1tb-ssd-rtx-4060-156-fe60fb00-dc49-4c2d-be95-adde65888774.webp',
            title: 'Servicios',
            price: '800€',
            category: 'Ordenadores'
        },
        {
            link: '/product/11',
            image: '/static/img/imgpc/153-msi-thin-gf63-12uc-688xes-intel-core-i7-12650h-16gb-1tb-ssd-rtx-3050-156.webp',
            title: 'Servicios',
            price: '800€',
            category: 'Ordenadores'
        },
        {
            link: '/product/12',
            image: '/static/img/imgpc/198-lenovo-ideapad-1-15amn7-amd-ryzen-5-7520u-16-gb-512gb-ssd-156.webp',
            title: 'Servicios',
            price: '800€',
            category: 'Ordenadores'
        },
        {
            link: '/product/13',
            image: '/static/img/imgpc/more-link.webp',
            title: 'Servicios',
            price: '800€',
            category: 'Ordenadores'
        }
    ];
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
                <a href="">Ver más</a>
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
                        {productsToShow.filter(product => product.category === selectedCategory || selectedCategory === 'Todos').map((product, index) => (
                            <article key={index}>
                                <a href={product.link}>
                                    <img src={product.image} alt={product.title} />
                                </a>
                                <div>
                                    <h2>{product.title}</h2>
                                    <p>Precio: {product.price}</p>
                                    <a href={product.link}>Leer más</a>
                                </div>
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