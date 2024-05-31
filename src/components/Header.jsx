import { useState, useEffect } from 'react';
import { Filters } from './Filters.jsx';
import { CartIcon } from './icons.jsx';
import './header.css';
import { Cart } from './Cart.jsx';
import { Link } from 'react-router-dom';

export function Header({ changeFilters }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);
    const [username, setUsername] = useState(null);

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    const handleMenuClick = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    const handleFilterClick = () => {
        setIsFiltersOpen(!isFiltersOpen);
    }

    const handleLogout = () => {
        localStorage.removeItem('username');
        setUsername(null);
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
                        {username ? (
                            <>
                                <button className='account'>{username}</button>
                                <button className='account-2' onClick={handleLogout}><p style={{fontSize:'.8rem',color:'white'}}>Cerrar sesión</p></button>
                            </>
                        ) : (
                            <button className='account'><Link to={"/login"} id='account-empty'>Mi Cuenta</Link></button>
                        )}
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