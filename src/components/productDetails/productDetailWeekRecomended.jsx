import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './productDetail.css';

export function ProductDetailWeekRecomended() {
    const { Id_producto } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3000/productos/recomendados/${Id_producto}`)
            .then(response => response.json())
            .then(data => {
                const asciiCodes = data.imagen_producto.data;
                const imageUrl = asciiCodes.map(code => String.fromCharCode(code)).join('');
                setProduct({ ...data, image: imageUrl });
            })
            .catch(error => console.error('Error:', error));
    }, [Id_producto]);

    if (!product) {
        return 'Cargando...';
    }
    console.log('Rendering ProductDetailWeekRecomended');

    return(
        <section>
            <div className="container-product">
                <aside>
                    <div>
                        <img src={product.image} alt={product.Nombre} />
                    </div>
                </aside>
                <article>
                    <h1>PORQUE NO VAS</h1>
                    <h1>{product.Nombre}</h1>
                    <p>{product.descripcion}</p>
                    <p>Precio: {product.precio}€</p>
                    <button className="btn btn-primary">Agregar al carrito</button>
                </article>
            </div>
        </section>
    )
}





