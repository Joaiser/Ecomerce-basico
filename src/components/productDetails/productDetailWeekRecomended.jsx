import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../../hooks/useCart.js';
import './productDetailWeekRecomended.css';
import { CartIcon } from '../icons.jsx';

export function ProductDetailWeekRecomended() {
    const { Id_producto } = useParams();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3000/productos/recomendados/${Id_producto}`)
            .then(response => response.json())
            .then(data => {
                const asciiCodes = data.imagen.data;
                const imageUrl = asciiCodes.map(code => String.fromCharCode(code)).join('');
                setProduct({ ...data, image: imageUrl });
            })
            .catch(error => console.error('Error:', error));
    }, [Id_producto]);

    if (!product) {
        return 'Cargando...';
    }

    return(
        <section>
            <div className="container-product-week-recomended">
                <aside>
                    <div>
                        <img src={product.image} alt={product.Nombre} />
                    </div>
                </aside>
                <article>
                    <h1>{product.Nombre}</h1>
                    <p>{product.descripcion}</p>
                    <p>Precio: {product.precio}€</p>
                    <button className="btn btn-primary" onClick={() => addToCart(product)}> <CartIcon /></button>
                </article>
            </div>
        </section>
    )
}