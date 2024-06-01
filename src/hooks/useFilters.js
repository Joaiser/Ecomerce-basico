import { useState, useEffect } from 'react';

export function useFilters(filter) {
    const initialProduct = {
        "id": 1,
        "nombre_producto": "Intel Pentium N4020",
        "imagen_producto": "/static/img/imgpc/1710-alurin-go-start-intel-pentium-n4020-8gb-256gb-ssd-156-comprar.webp",
        "descripcion": "Procesador económico Intel Pentium N4020, ideal para tareas básicas y navegación web.",
        "precio": "100.00",
        "categoria": "Ordenadores"
    };

    const [products, setProducts] = useState([initialProduct]);
    const [recommendedProducts, setRecommendedProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
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

    let filteredProducts = [...products, ...recommendedProducts, ...allProducts];
    if (filter) {
      filteredProducts = filteredProducts.filter(product => {
        return (
          product.precio >= filter.minprice &&
          (filter.category === 'all' || 
          product.categoria === filter.category)
        )
      });
    }

    return { filteredProducts, isLoading, error };
}