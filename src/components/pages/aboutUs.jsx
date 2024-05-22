import React from 'react';
import './aboutUs.css';

export function AboutUs() {
    return (
        <section id='about-us'>
            <div id='about-us-center'>
                <h1>Sobre Nosotros</h1>
                <div id='about-us-content'>
                    <p>Somos una pequeña empresa dedicada a la venta de productos de alta calidad. Nuestra misión es proporcionar a nuestros clientes una experiencia de compra excepcional, ofreciendo una amplia gama de productos a precios competitivos.</p>
                    <p>Desde nuestros inicios, hemos creído en la importancia de construir relaciones sólidas con nuestros clientes. Nos esforzamos por ofrecer un servicio al cliente excepcional y estamos siempre disponibles para responder a cualquier pregunta o inquietud.</p>
                    <p>Gracias por elegirnos para tus necesidades de compra. Estamos emocionados de servirte y esperamos superar tus expectativas.</p>
                </div>
                <div id='wait-about-us'>
                    <div id='wait-about-us-content'>
                        <div>
                            <img src="static/img/imgAboutus/ALMACEN065-1-de-1-1.webp" alt="Imagen de la empresa" />
                        </div>
                        <div>
                             <h2>
                                 ¿Qué puedes esperar de nosotros?
                             </h2>
                            <p>Llevamos poco tiempo a tu lado, construyendo y adaptándonos a lo que necesitas a medida que hemos ido avanzando.
                                No obstante, no es tanto todo lo que hemos hecho sino nuestra manera 
                                de hacerlo. Por ello, queremos que tengas claro que puedes esperar de nosotros y en qué centramos nuestros esfuerzos 
                                día a día. Para que sepas que puedes esperar de PcAitor si decides formar parte de esta familia.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}