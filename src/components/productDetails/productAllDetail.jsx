import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../../hooks/useCart.js';
import './productDetail.css';
import { CartIcon } from '../icons.jsx';

export function ProductAllDetail() {
    const { id } = useParams(); // Asegúrate de que el parámetro coincida con la ruta
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:3000/todosproductos/${id}`)
            .then(response => {
                setProduct(response.data);
            })
            .catch(error => {
                console.error('Error al cargar el producto:', error);
            });

        axios.get(`http://localhost:3000/comentarios/${id}`)
            .then(response => {
                setComments(response.data);
            })
            .catch(error => {
                console.error('Error al cargar los comentarios:', error);
            });
    }, [id]);

    const handleAddComment = () => {
        axios.post(`http://localhost:3000/comentarios`, { id_producto: id, comentario: newComment })
            .then(response => {
                setComments([...comments, response.data]);
                setNewComment('');
            })
            .catch(error => {
                console.error('Error al añadir el comentario:', error);
            });
    };

    if (!product) {
        return 'Cargando...';
    }

    return (
        <section>
            <div className="container-product">
                <article>
                <aside>
                    <div>
                        <img src={product.imagen_producto} alt={product.nombre_producto} />
                    </div>
                </aside>
                    <div id='product-description'>
                        <h1>{product.nombre_producto}</h1>
                        <p>{product.descripcion}</p>
                        <p>Precio: {product.precio}€</p>
                        <button className="btn btn-primary" onClick={() => addToCart(product)}><CartIcon /></button>
                    </div>
                </article>
                <div className="comments-section">
                    {comments.length > 0 ? (
                        comments.map(comment => (
                            <div key={comment.id} className="comment">
                                <p>{comment.comentario}</p>
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