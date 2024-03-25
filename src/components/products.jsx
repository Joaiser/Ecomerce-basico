import { useContext } from 'react';
import { FilterContext } from '../context/filters';
import { useFilters } from '../hooks/useFilters.js';
import { AddToCartIcon } from './icons.jsx';
import { useCart } from '../hooks/useCart.js';
import './Products.css';

export function Products() {
    const { filters } = useContext(FilterContext);
    const { addToCart, cart } = useCart();
    const { filteredProducts, isLoading, error } = useFilters(filters);

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
        <main className='products'>
            <ul>
                {filteredProducts.map((product) => (
                    <li key={product.id}>
                        <img src={product.image} alt={product.title} />
                        <div className='title'>
                            <strong>{product.title}</strong> - ${product.price}
                        </div>
                        <div>
                            <button onClick={()=>addToCart(product)}>
                                <AddToCartIcon />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </main>
    );
}