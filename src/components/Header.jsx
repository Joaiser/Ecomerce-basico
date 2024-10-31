import { useState, useEffect } from 'react';
import { Filters } from './Filters.jsx';
import { CartIcon } from './icons.jsx';
import './header.css';
import { Cart } from './Cart.jsx';
import { Link, useLocation } from 'react-router-dom';
import { SearchProducts } from './searchProducts'; 

export function Header({ changeFilters }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);
    const [username, setUsername] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    const handleMenuClick = (event) => {
        event.stopPropagation();
        setIsMenuOpen(!isMenuOpen);
    }

    const handleFilterClick = () => {
        setIsFiltersOpen(!isFiltersOpen);
    }

    const handleLogout = () => {
        localStorage.removeItem('username');
        setUsername(null);
    }

    const closeMenu = () => {
        setIsMenuOpen(false);
    }

    const isProductsPage = location.pathname === '/todosproductos';
    const isForoPage = location.pathname === '/foro';

    return (
        <>
        <header onClick={closeMenu} className={`${isProductsPage ? 'header-products' : ''} ${isForoPage ? 'header-foro' : ''}`}>
            <div className='max-width'>
                <div>
                    <h1><Link to="/" onClick={closeMenu}>PC Aitor <CartIcon /></Link></h1>
                        <div id='select-position'>
                            {isProductsPage && (
                                <div className={`filters ${isFiltersOpen ? 'open' : ''}`}>
                                    <Filters onChange={changeFilters} />
                                </div>
                            )}
                        </div>
                        <div>
                            <SearchProducts />
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
                        <li><Link to="/" onClick={closeMenu}>Inicio</Link></li>
                        <li><Link to="/todosproductos" onClick={closeMenu}>Productos</Link></li>
                        <li><Link to="/foro" onClick={closeMenu}>Foro</Link></li>
                        <li><Link to="/nosotros" onClick={closeMenu}>Nosotros</Link></li>
                        <li><Link to="/contacto" onClick={closeMenu}>Contacto</Link></li>
                    </ul>
                </nav>
            </div>
            
        </header>
        </>
    );
}