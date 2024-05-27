import './blog.css';
import { Link } from 'react-router-dom';

export function Blog() {
    
    const articles = [
        { title: 'Diferencias entre pantallas OLED, AMOLED, QLED y NanoCell: ¿cuál es mejor?',
          content: 'En este artículo te explicamos las diferencias entre las tecnologías de pantallas OLED, AMOLED, QLED y NanoCell, y te ayudamos a elegir la mejor para ti.', 
          imgSrc: 'static/img/tipos-de-pantallas.webp',
          link: '/screens' },
        { title: '¿Qué es una placa base y cuál es su función? Pulsa click para saber más',
         content: '¿Qué es una placa base y cuál es su función? En este artículo te explicamos todo lo que necesitas saber sobre este componente esencial de tu ordenador.', 
         imgSrc: 'static/img/que-es-placa-base.webp',
          link: '/placa' },
        { title: 'Diferencias y tipos de switch de teclado mecánico: ¿Cuál es mejor para ti?',
         content: 'En este artículo te explicamos las diferencias entre los distintos tipos de switch de teclado mecánico, y te ayudamos a elegir el mejor para ti.', 
         imgSrc: 'static/img/tecladoswitchblue.webp',
          link: '/tipoteclado' },
        { title: 'Las mejores sillas erogonómicas para trabajar desde casa de manera remota y cómoda',
          content: 'En este artículo te recomendamos las mejores sillas ergonómicas para trabajar desde casa, y te explicamos cómo elegir la mejor para ti.', 
          imgSrc: 'static/img/sillas-ergonomicas-1.webp',
          link: '/sillasergonomicas'},
       
    ];

    const handleClick = (event) => {
        event.stopPropagation();
    }

    return (
        <section id="blog-section">
            <h1>Nuestro Blog</h1>
            <ul id='container'>
                {articles.map((article, index) => (
                    <li key={index} className="article">
                        <img src={article.imgSrc} alt={article.title} className="article-img" />
                        <div className="article-content">
                            <h2 className="article-title">{article.title}</h2>
                            <p className="article-text">{article.content}</p>
                            <Link to={article.link} className="read-more-link" onClick={handleClick}>
                                <button>Leer más</button>
                            </Link>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
}