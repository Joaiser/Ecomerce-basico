import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../../hooks/useCart.js';
import './productDetail.css';
import { CartIcon } from '../icons.jsx';

export function AllProductDetail() {
    const { id } = useParams(); // Asegúrate de que el parámetro coincida con la ruta
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:3000/todosproductos/${id}`) 
            .then(response => {
                setProduct(response.data)
            })
            .catch(error => {
              error.message = 'Error al cargar el producto';
            });
    }, [id]);

    if (!product) {
        return 'Cargando...';
    }

    return (
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
                    <button className="btn btn-primary" onClick={() => addToCart(product)}><CartIcon /></button>
                </article>
            </div>
        </section>
    );
}