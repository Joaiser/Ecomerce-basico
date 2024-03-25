import { useState } from 'react';
import { Filters } from './Filters.jsx';
import { CartIcon } from './icons.jsx';
import './header.css';

export function Header({ changeFilters }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);

    const handleMenuClick = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    const handleFilterClick = () => {
        setIsFiltersOpen(!isFiltersOpen);
    }

    return (
        <>
        <header>
            <h1>Tienda <CartIcon /></h1>
            <button className="menu-icon" onClick={handleMenuClick}>☰</button>
            
            <nav>
                <ul className={isMenuOpen ? 'open' : ''}>
                <li><a href="/">Inicio</a></li>
                    <li><a href="/productos">Productos</a></li>
                    <li><a href="/intercambios">Intercambios</a></li>
                    <li><a href='Filters.jsx'>Filtrar Productos</a></li>
                    <li><a href="/Foro">Foro</a></li>
                    <li><a href="/nosotros">Nosotros</a></li>
                    <li><a href="/contacto">Contacto</a></li>
                </ul>
            </nav>
            <div className={`filters ${isFiltersOpen ? 'open' : ''}`}>
                <Filters onChange={changeFilters} />
            </div>
        </header>
        </>
    );
}