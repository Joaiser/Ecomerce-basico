import { useState, useEffect } from 'react';
import { AddToCartIcon } from './icons.jsx';
import './Products.css';

export function Products({ filter }) {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error('Error al cargar los productos');
                }
            })
            .then((data) => {
                setProducts(data);
                setIsLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setIsLoading(false);
            });
    }, []);

    let filteredProducts = products;
    if (filter) {
      filteredProducts = products.filter(product => {
        return (
          product.price >= filter.minprice &&
          (filter.category === 'all' || 
          product.category === filter.category)
        )
      });
    }

    if (isLoading) {
        return <div>Cargando productos...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
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
                            <button>
                                <AddToCartIcon />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </main>
    );
}