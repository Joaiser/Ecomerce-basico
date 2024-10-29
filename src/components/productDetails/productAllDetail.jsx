import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../../hooks/useCart.js';
import './productDetail.css';
import { CartIcon } from '../icons.jsx';

export function ProductAllDetail() {
    const { id } = useParams();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3000/todosproductos/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setProduct(data);
            })
            .catch(error => console.error('Error:', error));
    }, [id]);

    if (!product) {
        return 'Cargando...';
    }

    return(
        <section>
            <div className="container-product">
                <aside>
                    <div>
                        <img src={product.imagen_producto} alt={product.nombre_producto} />
                    </div>
                </aside>
                <article>
                    <h1>{product.nombre_producto}</h1>
                    <p>{product.descripcion}</p>
                    <p>Precio: {product.precio}€</p>
                    <button className="btn btn-primary" onClick={() => addToCart(product)}><CartIcon/></button>
                </article>
            </div>
        </section>
    )
}