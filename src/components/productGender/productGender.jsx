import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../../hooks/useCart.js';
import './productGender.css';
import { CartIcon } from '../icons.jsx';

export function ProductGender() {
    const { Genero } = useParams();
    const { addToCart } = useCart();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3000/products/category/${Genero}`)
            .then(response => response.json())
            .then(data => {
                const productsWithImages = data.map(product => {
                    const asciiCodes = product.imagen_producto.data;
                    const imageUrl = asciiCodes.map(code => String.fromCharCode(code)).join('');
                    return { ...product, image: imageUrl };
                });
                setProducts(productsWithImages);
            })
            .catch(error => console.error('Error:', error));
    }, [Genero]);

    if (!products.length) {
        return 'Cargando...';
    }

    return(
        <section className="products">
        <ul>
            {products.map(product => (
                <li key={product.Id_producto}>
                    <article>
                        <img src={product.image} alt={product.Nombre} loading='lazy'/>
                        <h1 className="title">{product.Nombre}</h1>
                        <p className='title-p'>{product.descripcion}</p>
                        <p className='title-p'>Precio: {product.precio}€</p>
                        <button className="btn btn-primary" onClick={() => addToCart(product)}><CartIcon/></button>
                    </article>
                </li>
            ))}
        </ul>
    </section>
    )
}