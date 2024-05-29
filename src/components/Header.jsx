import { useState } from 'react';
import { Filters } from './Filters.jsx';
import { CartIcon } from './icons.jsx';
import './header.css';
import { Cart } from './Cart.jsx';
import { Link } from 'react-router-dom';

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
            <div className='max-width'>
                <div>
                    <h1><Link to="/">PC Aitor <CartIcon /></Link></h1>
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
                        <button id='account'><a href="">Mi Cuenta</a></button>
                        <Cart />
                    </div>
                </div>
            </div>
            <div className='max-width'>
                <button className="menu-icon" onClick={handleMenuClick}>☰</button>
                
                <nav>
                    <ul className={isMenuOpen ? 'open' : ''}>
                        <li><Link to="/">Inicio</Link></li>
                        <li><Link to="/productos">Productos</Link></li>
                        <li><Link to="/intercambios">Intercambios</Link></li>
                        <li><Link to="/foro">Foro</Link></li>
                        <li><Link to="/nosotros">Nosotros</Link></li>
                        <li><Link to="/contacto">Contacto</Link></li>
                    </ul>
                </nav>
            </div>
            
        </header>
        </>
    );
}