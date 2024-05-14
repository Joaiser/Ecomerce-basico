import './blog.css';
import { useCarousel as useCarouselFromHooks } from '../hooks/carrousel';

export function Blog() {
    
    const articles = [
        { title: 'Diferencias entre pantallas OLED, AMOLED, QLED y NanoCell: ¿cuál es mejor?',
          content: 'En este artículo te explicamos las diferencias entre las tecnologías de pantallas OLED, AMOLED, QLED y NanoCell, y te ayudamos a elegir la mejor para ti.', 
         imgSrc: 'static/img/tipos-de-pantallas.webp',
          link: '#' },
        { title: '¿Qué es una placa base y cuál es su función? Pulsa click para saber más',
         content: '¿Qué es una placa base y cuál es su función? En este artículo te explicamos todo lo que necesitas saber sobre este componente esencial de tu ordenador.', 
         imgSrc: 'static/img/que-es-placa-base.webp',
          link: '#' },
        { title: 'Diferencias y tipos de switch de teclado mecánico: ¿Cuál es mejor para ti?',
         content: 'En este artículo te explicamos las diferencias entre los distintos tipos de switch de teclado mecánico, y te ayudamos a elegir el mejor para ti.', 
         imgSrc: 'static/img/tecladoswitchblue.webp',
          link: '#'},
        { title: 'Las mejores sillas erogonómicas para trabajar desde casa de manera remota y cómoda',
          content: 'En este artículo te recomendamos las mejores sillas ergonómicas para trabajar desde casa, y te explicamos cómo elegir la mejor para ti.', 
          imgSrc: 'static/img/sillas-ergonomicas-1.webp',
          link: '#'},
        { title: 'Cómo trabajar con dos pantallas a la vez conectadas a un portátil. Pulsa click para saber más',
          content: 'En este artículo te explicamos cómo trabajar con dos pantallas a la vez conectadas a un portátil, y te damos algunos consejos para ser más productivo.', 
          imgSrc: 'static/img/monitores-para-trabajar.webp',
          link: '#'},
        { title: 'Las mejores sillas gamimg de alta gama. Pulsa click para saber más',
          content: 'En este artículo te recomendamos las mejores sillas gaming de alta gama, y te explicamos cómo elegir la mejor para ti.', 
          imgSrc: 'static/img/mejores-sillas-gaming.webp',
          link: '#'}
    ];

    const { carouselRef, nextSlide, prevSlide } = useCarouselFromHooks(articles.length);

    return (
        <section id="blog-section">
    <h1>Nuestro Blog</h1>
    <div id='carousel-container'>
        <div id='section-center' ref={carouselRef}>
            {articles.map((article, index) => (
                <article key={index} className="carousel-article">
                    <a href={article.link} className="article-link">
                        <img src={article.imgSrc} alt={article.title} className="article-img" />
                        <div className="article-content">
                            <h2 className="article-title">{article.title}</h2>
                            <p className="article-text">{article.content}</p>
                            <a href={article.link} className="read-more-link">Leer más</a>
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