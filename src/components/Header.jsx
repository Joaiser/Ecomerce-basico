import { useState } from 'react';
import { Filters } from './Filters.jsx';
import { CartIcon } from './icons.jsx';
import './header.css';
import { Cart } from './Cart.jsx';

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
            <div>
                <h1>PC Aitor <CartIcon /></h1>
                <div id='select-position'>
                    <select name="state-product" id="state-product">
                    <option value="all-categories">Todas las categorías</option>
                    <option value="reconditioned">Reacondicionado</option>
                    </select>
                
                {/*<div className={`filters ${isFiltersOpen ? 'open' : ''}`}>
                    <Filters onChange={changeFilters} />
                </div>*/}
                    <input type="text" placeholder='Introduzca el nombre del producto que desea buscar' id='search'/>
                </div>
                <div>
                    <button><a href="">Mi Cuenta</a></button>
                    <Cart />
                </div>
            </div>

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
            
        </header>
        </>
    );
}