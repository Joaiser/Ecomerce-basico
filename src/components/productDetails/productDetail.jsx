import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../../hooks/useCart.js';
import './productDetail.css';
import { CartIcon } from '../icons.jsx';
import {useComments} from '../../hooks/useCommentsToProducts.js';

export function ProductDetail() {
    const { Id_producto } = useParams();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);

    const{
        comments,
        newComment,
        setNewComment,
        handleAddComment,
        handleDeleteComment,
        isAdmin,
        error,
    } = useComments(Id_producto);

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
                <article>
                    <aside>
                        <div>
                            <img src={product.imagen_producto} alt={product.nombre_producto} />
                        </div>
                    </aside>
                    <div id="product-description">
                        <h1>{product.nombre_producto}</h1>
                        <p>{product.descripcion}</p>
                        <p>Precio: {product.precio}€</p>
                        <button className="btn btn-primary" onClick={() => addToCart(product)}>
                            <CartIcon />
                        </button>
                    </div>
                </article>
                <div className="comments-section">
                    <h2>Comentarios</h2>
                    {error && <p className="error">{error}</p>}
                    {comments.length > 0 ? (
                        comments.map(comment => (
                            <div key={comment.id} className="comment">
                                <p><strong>{comment.username}</strong>: {comment.comentario}</p>
                                {isAdmin && (
                                    <button onClick={() => handleDeleteComment(comment.id)}>Eliminar</button>
                                )}
                            </div>
                        ))
                    ) : (
                        <p>No hay comentarios aún.</p>
                    )}
                    <div className="add-comment">
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Añadir un comentario"
                        />
                        <button onClick={handleAddComment}>Añadir Comentario</button>
                    </div>
                </div>
            </div>
        </section>
    )
}