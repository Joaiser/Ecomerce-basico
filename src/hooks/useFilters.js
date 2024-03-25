import { useState, useEffect } from 'react';

export function useFilters(filter) {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {   
        setIsLoading(true);
        setError(null);
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

    return { filteredProducts, isLoading, error };
}