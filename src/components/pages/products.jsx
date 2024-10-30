import { useContext, useEffect } from 'react';
import { FilterContext } from '../../context/filters.jsx';
import { useFilters } from '../../hooks/useFilters.js';
import { AddToCartIcon } from '../icons.jsx';
import { useCart } from '../../hooks/useCart.js';
import { Link } from 'react-router-dom';
import './Products.css';
import { Link } from 'react-router-dom';

export function Products() {
    const { filters } = useContext(FilterContext);
    const { addToCart, cart } = useCart();
    const { filteredProducts, isLoading, error } = useFilters(filters);

    useEffect(() => {
    }, [filteredProducts]);
    
    if (isLoading) {
        return <div>Cargando productos...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (filteredProducts.length === 0) {
        return <div style={{padding: '2rem', textDecoration: 'underline',
         textDecorationThickness: '2px', textUnderlineOffset: '.3rem'}}>
        No hay productos que coincidan con los criterios de filtro.</div>;
    }

    return (
        <main className='all-products'>
            <ul>
                {filteredProducts.map((product) => (
                <Link to={`/todosproductos/${product.id}`}>
                    <li key={product.id}>
                        <Link to={`/todosproductos/${product.id}`}>
                            <img src={product.imagen_producto} alt={product.nombre_producto} />
                            <div className='title'>
                                <strong>{product.nombre_producto}</strong> - €{product.precio}
                            </div>
                        </Link>
                        <div>
                            <button onClick={() => addToCart(product)}>
                                <AddToCartIcon />
                            </button>
                        </div>
                    </li>
                </Link>
                ))}
            </ul>
        </main>
    );
}