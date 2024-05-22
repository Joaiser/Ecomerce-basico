import { useCarousel } from '../hooks/carrousel';
import './weekrecomended.css';

export function WeekRecomended() {
    const data = [ 
        {
            src: '/static/img/imgrecomended/1819-aoc-24b1h-236-led-fullhd-mate-mejor-precio.webp',
            description: 'AOC 24B1H 23.6" LED FullHD Mate',
            precio: '79€',
            estrellas: 'aqui va una imagen de estrellas',
            envio: 'Envío gratis',
            fechaEnvio: 'Entrega en 6 días'
        },
        {
            src: '/static/img/imgpc/153-msi-thin-gf63-12uc-688xes-intel-core-i7-12650h-16gb-1tb-ssd-rtx-3050-156.webp',
            description: 'MSI Thin GF63 12UC-688XES Intel Core i7-1165G7/16GB/512GB SSD/15.6"',
            precio: '789€',
            estrellas: 'aqui va una imagen de estrellas',
            envio: 'Envío gratis',
            fechaEnvio: 'Entrega en 5 días'
        },
        {
            src: '/static/img/imgrecomended/1124-samsung-galaxy-watch6-40mm-grafito.webp',
            description: 'Samgsung Galaxy Watch6 Bluetooth 40mm grafito',
            precio: '199€',
            estrellas: 'aqui va una imagen de estrellas',
            envio: 'Envío gratis',
            fechaEnvio: 'Entrega en 4 días'
        },
        {
            src: '/static/img/imgrecomended/1794-samsung-ue43cu7172uxxh-43-led-crystal-ultrahd-4k-hdr10.webp',
            description: 'Samsung UE43CU7172UXXH 43" LED Crystal UHD 4K HDR10',
            precio: '309€',
            estrellas: 'aqui va una imagen de estrellas',
            envio: 'Envío gratis',
            fechaEnvio: 'Entrega en 3 días'
        },
        {
            src: '/static/img/imgrecomended/1582-pccom-ready-amd-ryzen-5-5600x-16gb-1tb-ssd-rtx-4060-comprar.webp',
            description: 'Pccom Ready AMD Ryzen 5 5600X/16GB/1TB SSD/RTX 4060',
            precio: '979€',
            estrellas: 'aqui va una imagen de estrellas',
            envio: 'Envío gratis',
            fechaEnvio: 'Entrega en 3 días'
        },
        {
            src: '/static/img/imgrecomended/1197-logitech-g435-lightspeed-auriculares-gaming-inalambricos-negros.webp',
            description: 'Logitect G435 LIGHTSPEED Auriculares Gaming Inalámbricos Negros',
            precio: '48,86€',
            estrellas: 'aqui va una imagen de estrellas',
            envio: 'Envío gratis',
            fechaEnvio: 'Entrega en 2 días'
        },
        {
            src: '/static/img/imgrecomended/1669-apple-iphone-15-pro-max-256gb-titanio-natural-libre.webp',
            description: 'Apple iPhone 15 Pro Max 256GB Titanio Natural Libre',
            precio: '1299,01€',
            estrellas: 'aqui va una imagen de estrellas',
            envio: 'Envío gratis',
            fechaEnvio: 'Entrega en 1 día'
        },
        {
            src: '/static/img/imgrecomended/1568-lg-32lq631c-32-led-fullhd-hdr.webp',
            description: 'LG 32LQ631C 32" LED Full HD Smart TV Wifi',
            precio: '199€',
            estrellas :'Imagen estrellas', 
            envio: 'Envío gratis', 
            fechaEnvio: 'Recibelo en 2 días'
        },
        {
            src: '/static/img/imgrecomended/1612-samsung-galaxy-s24-8-256gb-gris-marble-libre.webp',
            description: 'Samsung Galaxy S24 8/256GB Gris Marble Libre',
            precio: '899,01€',
            estrellas: 'Imagen estrellas',
            envio: 'Envío gratis',
            fechaEnvio: 'Recibelo en 3 días'
        }
    ];

    const { carouselRef, nextSlide, prevSlide } = useCarousel(data.length);
    
    return(
        <section id='week-recomended-container'>
          <div id='week-recomended-container-center'>
            <h1>Recomendación de la semana</h1>
            <article id='carusell-article-week-recomended'>
                    <div ref={carouselRef} id='div-carusell-week-recomended'>
                        {data.map((item, i) => (
                            <div key={i} className="slide-week-recomended">
                                <a href="#"> {/*arreglar el a href*/}
                                    <img className="img-week-recomended" src={item.src} alt={`Slide ${i + 1}`} />
                                    <p className="legend">{item.description}</p>
                                    <span className='price'>Precio: {item.precio}</span>
                                    <span className='stars'>{item.estrellas}</span>
                                    <span className='shipping'>{item.envio}</span>
                                    <span className='shipping-date'>{item.fechaEnvio}</span>
                                </a>
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
