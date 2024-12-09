import React, { useState, useEffect, useMemo } from 'react';
import { Filters } from './Filters.jsx';
import { CartIcon } from './icons.jsx';
import './header.css';
import { Cart } from './Cart.jsx';
import { Link, useLocation } from 'react-router-dom';
import { SearchProducts } from './searchProducts';
import jwt_decode from 'jwt-decode';
import cookie from 'js-cookie';
import {clearAccessToken} from '../utils/authUtils.js';

export function Header({ changeFilters }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);
    const [username, setUsername] = useState(cookie.get('username') || null);
    const [role, setRole] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const token = cookie.get('refreshToken');
        if (token) {
            try {
                const decodedToken = jwt_decode(token);
                setRole(decodedToken.role); // Actualizamos el rol desde el token
            } catch (error) {
                console.error('Error decoding token:', error);
            }
        }
    }, []);

    const handleMenuClick = (event) => {
        event.stopPropagation();
        setIsMenuOpen(!isMenuOpen);
    };

    const handleFilterClick = () => {
        setIsFiltersOpen(!isFiltersOpen);
    };

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:3000/admins/logout', {
                method: 'POST',
                credentials: 'include', // Asegura el manejo de cookies
            });
    
            if (response.ok) {
                cookie.remove('username'); // Elimina la cookie de username
                cookie.remove('refreshToken'); // Elimina la cookie de refreshToken
                cookie.remove('accesToken')
                setRole(null);
                setUsername(null);
                clearAccessToken();
                alert('Logged out successfully');
            } else {
                console.error('Failed to log out');
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };
    
    

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const isProductsPage = useMemo(() => location.pathname === '/todosproductos', [location.pathname]);
    const isForoPage = useMemo(() => location.pathname === '/foro', [location.pathname]);

    return (
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
                                <button className='account-2' onClick={handleLogout}><p style={{ fontSize: '.8rem', color: 'white' }}>Cerrar sesión</p></button>
                                {role === 'admin' && (
                                    <Link to="/admin" className='account-2'>Admin</Link>
                                )}
                            </>
                        ) : (
                            <button className='account account-empty'>
                                <Link to={"/login"} id='account-empty'>Mi Cuenta</Link>
                            </button>
                        )}
                        <CartMemo />
                    </div>
                </div>
            </div>
            <div className='max-width'>
                <button className="menu-icon" onClick={handleMenuClick}>☰</button>
                <nav>
                    <ul className={isMenuOpen ? 'open' : ''}>
                        <li className='enlaces'><Link to="/" onClick={closeMenu}>Inicio</Link></li>
                        <li className='enlaces'><Link to="/todosproductos" onClick={closeMenu}>Productos</Link></li>
                        <li className='enlaces'><Link to="/foro" onClick={closeMenu}>Foro</Link></li>
                        <li className='enlaces'><Link to="/nosotros" onClick={closeMenu}>Nosotros</Link></li>
                        <li className='enlaces' id='last-menu-opne'><Link to="/contacto" onClick={closeMenu}>Contacto</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

const CartMemo = React.memo(Cart);
