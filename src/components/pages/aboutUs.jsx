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
                <article id='wait-about-us'>
                    <div id='wait-about-us-content'>
                        <div>
                            <img src="static/img/imgAboutus/ALMACEN065-1-de-1-1.webp" alt="Imagen de la empresa" />
                        </div>
                        <div>
                             <h2>
                                 ¿Qué puedes esperar de nosotros?
                             </h2>
                            <p>
                                Llevamos poco tiempo a tu lado, construyendo y adaptándonos a lo que necesitas a medida que hemos ido avanzando.
                                No obstante, no es tanto todo lo que hemos hecho sino nuestra manera 
                                de hacerlo. Por ello, queremos que tengas claro que puedes esperar de nosotros y en qué centramos nuestros esfuerzos 
                                día a día. Para que sepas que puedes esperar de PcAitor si decides formar parte de esta familia.
                            </p>
                        </div>
                    </div>
                </article>
                <article id='our-history'>
                    <div>
                        <h2>Nuestra historia</h2>
                    
                        <p>
                            Somos una pequeña empresa, pero con grandes aspiraciones. Nuestra historia comenzó en 2018, cuando empezar el proyecto
                            de iniciar nuestra primera tienda en línea. Desde entonces, hemos crecido y expandido nuestra oferta de productos,
                            pero nuestra misión sigue siendo la misma: proporcionar a nuestros clientes productos de alta calidad a precios
                            competitivos.
                        </p>
                    </div>
                    <div>
                        <img src="static/img/imgAboutus/ALMACEN040-1-de-1-2.webp" alt="imagen de la empresa" />
                    </div>
                </article>
                <article id='red-article'>
                    <div id='red-article-center'>
                        <h2>Si necesitas algo, estamos aquí para servirte</h2>
                        <div id='redes'>
                            <ul>
                                <li>
                                    <a href="#"><img src="static/img/redes/24-facebook.webp" alt="imagen de las redes"style={{width: '100px'}}/></a>
                                </li>
                                <li>
                                    <a href="#">
                                        <svg width="140" height="80" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.0665 26.8001C21.0665 26.8001 26.6665 18.4001 26.6665 11.2001V10.5334C27.7332 9.7334 28.6665 8.80006 29.3332 7.7334C28.3999 8.1334 27.3332 8.40006 26.1332 8.5334C27.3332 7.86673 28.1332 6.80006 28.5332 5.46673C27.4665 6.1334 26.2665 6.5334 25.0665 6.80006C23.0665 4.66673 19.5999 4.5334 17.3332 6.66673C15.8665 8.00006 15.3332 10.0001 15.7332 11.8667C11.3332 11.6001 7.3332 9.60006 4.5332 6.1334C3.06654 8.66673 3.86654 11.8667 6.26654 13.4667C5.3332 13.4667 4.5332 13.2001 3.7332 12.8001V12.9334C3.7332 15.6001 5.59987 17.7334 8.1332 18.2667C7.3332 18.5334 6.5332 18.5334 5.59987 18.4001C6.26654 20.6667 8.39987 22.1334 10.6665 22.1334C8.66654 23.6001 6.39987 24.5334 3.86654 24.5334C3.46654 24.5334 2.9332 24.5334 2.5332 24.4001C5.19987 26.0001 8.1332 26.8001 11.0665 26.8001Z" fill="#333333"/>
                                        </svg>
                                    </a>
                                </li>
                                <li>
                                    <a href="#"><svg width="140" height="80" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M22.0003 2.66675H10.0003C6.00033 2.66675 2.66699 6.00008 2.66699 10.0001V22.0001C2.66699 26.0001 6.00033 29.3334 10.0003 29.3334H22.0003C26.0003 29.3334 29.3337 26.0001 29.3337 22.0001V10.0001C29.3337 6.00008 26.0003 2.66675 22.0003 2.66675ZM26.9337 22.0001C26.9337 24.8001 24.667 26.9334 22.0003 26.9334H10.0003C7.20033 26.9334 5.06699 24.6667 5.06699 22.0001V10.0001C5.06699 7.20008 7.33366 5.06675 10.0003 5.06675H22.0003C24.8003 5.06675 26.9337 7.33341 26.9337 10.0001V22.0001ZM16.0003 9.06675C12.267 9.06675 9.06699 12.1334 9.06699 16.0001C9.06699 19.7334 12.1337 22.9334 16.0003 22.9334C19.867 22.9334 22.9337 19.8667 22.9337 16.0001C22.9337 12.2667 19.7337 9.06675 16.0003 9.06675ZM16.0003 20.5334C13.467 20.5334 11.467 18.5334 11.467 16.0001C11.467 13.4667 13.467 11.4667 16.0003 11.4667C18.5337 11.4667 20.5337 13.4667 20.5337 16.0001C20.5337 18.5334 18.5337 20.5334 16.0003 20.5334ZM24.9337 8.80008C24.9337 9.75737 24.1576 10.5334 23.2003 10.5334C22.243 10.5334 21.467 9.75737 21.467 8.80008C21.467 7.84279 22.243 7.06675 23.2003 7.06675C24.1576 7.06675 24.9337 7.84279 24.9337 8.80008Z" fill="#333333"/>
                                        </svg>
                                    </a>
                                </li>
                            </ul>
                            <div>
                                <div id='contact-center'>
                                    <div>
                                    <svg width="100" height="75" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M25.467 6.53332C22.9337 3.99999 19.6003 2.66666 16.0003 2.66666C8.66699 2.66666 2.66699 8.66666 2.66699 16C2.66699 18.4 3.33366 20.6667 4.40033 22.6667L2.66699 29.3333L9.73366 27.4667C11.7337 28.5333 13.867 29.0667 16.1337 29.0667C23.467 29.0667 29.467 23.0667 29.467 15.7333C29.3337 12.4 28.0003 9.06666 25.467 6.53332ZM16.0003 26.9333C14.0003 26.9333 12.1337 26.4 10.4003 25.3333L10.0003 25.0667L5.86699 26.1333L6.93366 22L6.66699 21.7333C5.60033 20 4.93366 18 4.93366 15.8667C4.93366 9.73332 9.86699 4.79999 16.0003 4.79999C18.9337 4.79999 21.7337 5.99999 23.867 7.99999C26.0003 10.1333 27.067 12.8 27.067 15.8667C27.067 22 22.1337 26.9333 16.0003 26.9333ZM21.0003 18.1333C21.5003 18.3666 22.0003 18.6 22.1337 18.6667C22.4003 18.8 22.667 18.9333 22.8003 19.0667C22.9337 19.2 22.9337 19.8667 22.667 20.6667C22.4003 21.4667 21.067 22.1333 20.4003 22.2667C19.7337 22.4 19.067 22.4 18.267 22.1333C18.167 22.1 18.0503 22.0667 17.9191 22.0292C17.5253 21.9167 17.0003 21.7667 16.4003 21.4667C13.067 20 10.8003 16.6667 10.667 16.4C10.646 16.3581 10.5987 16.2831 10.5338 16.1804C10.1859 15.6301 9.33366 14.2817 9.33366 12.9333C9.33366 11.5619 9.92141 10.7782 10.2573 10.3304C10.3132 10.2558 10.3622 10.1905 10.4003 10.1333C10.8003 9.86666 11.067 9.73332 11.3337 9.73332H12.0003C12.1337 9.73332 12.5337 9.73332 12.667 10.6667C12.9337 11.3333 13.6003 12.9333 13.7337 13.0667C13.7337 13.107 13.7459 13.1474 13.7592 13.1915C13.79 13.293 13.8266 13.4141 13.7337 13.6C13.7337 13.8667 13.7337 14 13.467 14.1333C13.2811 14.2263 13.16 14.3841 13.0585 14.5163C13.0144 14.5737 12.974 14.6263 12.9337 14.6667C12.8003 14.8 12.667 15.0667 12.8003 15.3333C12.8932 15.4262 13.0346 15.6162 13.219 15.8637C13.5638 16.3269 14.0588 16.9918 14.667 17.6C15.6738 18.4949 16.6806 18.9206 17.1362 19.1132C17.2236 19.1501 17.2907 19.1785 17.3337 19.2C17.6003 19.3333 17.7337 19.3333 18.0003 19.0667C18.1337 18.9333 18.3337 18.6667 18.5337 18.4C18.7337 18.1333 18.9337 17.8667 19.067 17.7333C19.3337 17.4667 19.6003 17.4667 19.867 17.6C20.0003 17.6667 20.5003 17.9 21.0003 18.1333Z" fill="#333333"/>
                                    </svg>
                                        <h3>whatsApp</h3>
                                        <p>
                                            Enviamos un whatsApp y recibe 
                                        </p>
                                        <span className='bold'>respuestas en tu móvil</span>
                                        <p>
                                            900 900 900
                                        </p>
                                    </div>
                                    <div>
                                        <svg width="140" height="80" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M15.9997 20C12.2663 20 9.33301 17.0667 9.33301 13.3333C9.33301 9.6 12.2663 6.66667 15.9997 6.66667C19.733 6.66667 22.6663 9.6 22.6663 13.3333H19.9997C19.9997 11.0667 18.2663 9.33333 15.9997 9.33333C13.733 9.33333 11.9997 11.0667 11.9997 13.3333C11.9997 15.6 13.733 17.3333 15.9997 17.3333V20ZM21.333 20H17.333V14.6667H22.6663V17.0667C24.2663 16.5333 25.333 15.0667 25.333 13.3333V10.6667H27.9997V13.3333C27.9997 17.0667 25.0663 20 21.333 20ZM5.33301 32V29.3333C5.33301 24.6667 9.73301 21.3333 15.9997 21.3333C22.2663 21.3333 26.6663 24.6667 26.6663 29.3333V32H5.33301ZM23.9997 29.3333C23.9997 26.1333 20.6663 24 15.9997 24C11.333 24 7.99967 26.1333 7.99967 29.3333H23.9997Z" fill="#333333"/>
                                        </svg>

                                        <h3>Teléfono</h3>
                                        <p>
                                            Si tu consulta es urgente, llámanos!
                                        </p>
                                            <span className='bold'>
                                                Lunes a Viernes de 9:00 a 20:00h    
                                            </span>
                                        

                                        <p>
                                            900 900 900
                                        </p>
                                    </div>
                                </div>
                                <div id='contact-characteristics'>
                                    <div>
                                        <img src="static/img/redes/64px_truck_delivery.webp" alt="imagen de un camnion" />
                                        <p>
                                            <span className='bold'>Envío gratuitos</span> en pedidos superiores a 50€
                                        </p>
                                    </div>
                                    <div id='border-div'>
                                        <img src="static/img/redes/64px_hold.webp" alt="imagen de una mano" />
                                        <p>
                                            Recibe tu pedido en 24 horas
                                        </p>
                                    </div>
                                    <div>
                                        <img src="static/img/redes/64px_refresh.webp" alt="imagen de unas flechas" />
                                        <p>
                                           <span className='bold'>Devoluciones gratuitas</span> y garantía de solución de 24 horas
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        </section>
    );
}