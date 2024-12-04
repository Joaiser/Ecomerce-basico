import React from 'react';
import './init.css';
import { Link } from 'react-router-dom';

export function Init() {
    return (
        <>
        <section id='presentation'>
        <h2><Link to={"/concurso"}>Participa en nuestro concurso para ganar un PC Gaming</Link></h2>
        
        <div id='section-init-center'>
                <article id='images-init'>
                    <Link to="/productos/genero/ordenadores"><img src="static/img/imagenesProductosCategoria/500x500-portatiles.webp" 
                    alt="Imagen de portátiles" /></Link>
                    <Link to="/productos/genero/componentes"><img src="static/img/imagenesProductosCategoria/500x500-componentes.webp"
                     alt="Imagen de componentes PC" /></Link>
                    <Link to="/productos/genero/moviles"><img src="static/img/imagenesProductosCategoria/tv-500x500-v3.webp" 
                    alt="Imagen de smartphones" /></Link>
                    <Link to="/productos/genero/televisores"><img src="static/img/imagenesProductosCategoria/500x500-smartphones-marzo.webp" 
                    alt="Imagen de TV y audio" /></Link>                  
                </article>
            </div>
        </section>
        </>
    )
}