import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../../hooks/useCart.js';
import { useComments } from '../../hooks/useComments.js';
import './productDetail.css';
import { CartIcon } from '../icons.jsx';

export function ProductAllDetail() {
    const { id } = useParams();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);

    const {
        comments,
        newComment,
        setNewComment,
        handleAddComment,
        handleDeleteComment,
        isAdmin,
        error,
    } = useComments(id);

    useEffect(() => {
        axios.get(`http://localhost:3000/todosproductos/${id}`)
            .then(response => setProduct(response.data))
            .catch(error => console.error('Error al cargar el producto:', error));
    }, [id]);

    if (!product) return 'Cargando...';

    return (
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
    );
}