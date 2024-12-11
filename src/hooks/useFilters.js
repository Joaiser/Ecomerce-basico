import { useContext, useState, useEffect } from 'react';
import { FilterContext } from '../context/filters';

export function useFilters() {
    const { filters } = useContext(FilterContext);  // Aquí tomamos los filtros del contexto
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        setError(null);

        fetch('http://localhost:3000/todosproductos')
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

    // Ahora usamos los filtros del contexto para filtrar los productos
    const filteredProducts = products.filter(product => {
        return (
            product.precio >= filters.minprice &&
            (filters.category === 'all' || product.categoria === filters.category)
        );
    });

    return { filteredProducts, isLoading, error };
}
