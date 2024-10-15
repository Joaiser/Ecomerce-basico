import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate,useLocation } from 'react-router-dom';
import './searchProducts.css';

export function SearchProducts() {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [showResults, setShowResults] = useState(true);

    const navigate = useNavigate();
    const location = useLocation();

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
        setShowResults(true);
    };

    async function fetchProducts(searchTerm) {
        if (!searchTerm) {
            setResults([]);
            return;
        }
        try {
            const response = await fetch(`http://localhost:3000/products?query=${encodeURIComponent(searchTerm)}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new TypeError("Oops, we haven't got JSON!");
            }

            const data = await response.json();
            if (data === null) {
                console.error("Received null data");
                setResults([]);
            } else {
                setResults(data);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
            setResults([]);
        }
    }

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            fetchProducts(searchTerm);
        }, 500);

        return () => clearTimeout(delayDebounce);
    }, [searchTerm]);

    useEffect(() => {
        const searchTermNormalized = searchTerm.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        const genres = ['ordenadores', 'moviles', 'componentes', 'televisores']; // 'móviles' cambiado a 'moviles'
    
        if (genres.includes(searchTermNormalized)) {
            setShowResults(false); // Asegúrate de ocultar los resultados al navegar
            navigate(`/productos/genero/${searchTermNormalized}`);
            setSearchTerm(''); // Limpia el término de búsqueda después de navegar
        }
    }, [searchTerm, navigate]);

    useEffect(() => {
        const path = location.pathname;
        if (!path.startsWith('/buscar') && !path.startsWith('/producto')) {
            setSearchTerm(''); // Limpia el término de búsqueda si no estás en una página de búsqueda o producto
        }
    }, [location]);

    const filteredResults = useMemo(() => {
        return results.filter(product => {
            const productNameNormalized = product.Nombre?.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
            const productGenreNormalized = product.Genero?.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
            const searchTermNormalized = searchTerm.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
            return productNameNormalized?.includes(searchTermNormalized) || productGenreNormalized?.includes(searchTermNormalized);
        });
    }, [results, searchTerm]);

    const productsByCategory = useMemo(() => {
        const groups = {};
        filteredResults.forEach(product => {
            if (!groups[product.Genero]) {
                groups[product.Genero] = [];
            }
            groups[product.Genero].push(product);
        });
        return groups;
    }, [filteredResults]);
    
    return (
        <div className="search-container">
            <div>
                <input
                    type="text"
                    placeholder='Búsqueda de productos'
                    value={searchTerm}
                    onChange={handleChange}
                />
            </div>
            
            {showResults && (
                <div className={`search-results ${Object.keys(productsByCategory).length === 0 || searchTerm === '' ? 'search-results-hidden' : ''}`}>
                    {Object.entries(productsByCategory).map(([category, products]) => (
                        <ul key={category}>
                            <li className="product-category">{category}</li>
                            {products.map(product => (
                                <li key={product.Id_producto} onClick={() => setShowResults(false)}>
                                    <Link to={`/productos/${product.Id_producto}`}>
                                        {product.Nombre} - {product.Genero}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ))}
                </div>
            )}
        </div>
    );
}

export default SearchProducts;