import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../../hooks/useCart.js';
import './productDetail.css';
import { CartIcon } from '../icons.jsx';

export function ProductDetail() {
    const { Id_producto } = useParams();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3000/products/${Id_producto}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data && data.imagen_producto && Array.isArray(data.imagen_producto.data)) {
                    const asciiCodes = data.imagen_producto.data;
                    const imageUrl = asciiCodes.map(code => String.fromCharCode(code)).join('');
                    setProduct({ ...data, image: imageUrl });
                } 
            })
            .catch(error => console.error('Error:', error));
    }, [Id_producto]);

    if (!product) {
        return 'Cargando...';
    }

    return(
        <section>
            <div className="container-product">
                <aside>
                    <div>
                        <img src={product.image} alt={product.Nombre} />
                    </div>
                </aside>
                <article>
                    <h1>{product.Nombre}</h1>
                    <p>{product.descripcion}</p>
                    <p>Precio: {product.precio}€</p>
                    <button className="btn btn-primary" onClick={() => addToCart(product)}><CartIcon/></button>
                </article>
            </div>
        </section>
    )
}