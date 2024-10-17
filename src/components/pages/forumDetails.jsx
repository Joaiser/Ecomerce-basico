import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useForum } from '../../hooks/useForum'; 
import "./forumDetails.css";

export function ForumDetails() {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newReplyContent, setNewReplyContent] = useState('');
    const [replyErrors, setReplyErrors] = useState({});

    const {
        username
    } = useForum();

    useEffect(() => {
        axios.get(`http://localhost:3000/posts/${postId}`)
            .then(response => {
                setPost(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, [postId]);

    const handleReplySubmitWrapper = (event) => {
        event.preventDefault();
        const replyWithUsername = {
            username: username,
            content: newReplyContent
        };

        axios.post(`http://localhost:3000/posts/${postId}/replies`, replyWithUsername)
            .then(response => {
                setNewReplyContent('');
                fetchPostDetails(); // Volver a obtener los detalles del post después de crear una nueva respuesta
                setReplyErrors(prevErrors => ({ ...prevErrors, [postId]: '' }));
            })
            .catch(error => {
                setReplyErrors(prevErrors => ({ ...prevErrors, [postId]: 'Error al crear respuesta' }));
            });
    };

    const fetchPostDetails = () => {
        axios.get(`http://localhost:3000/posts/${postId}`)
            .then(response => {
                setPost(response.data);
            })
            .catch(error => {
                setError(error);
            });
    };

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>Error al cargar el post: {error.message}</div>;
    }

    return (
        <div className="forum-details">
            {post ? (
                <>
                    <h1>{post.title}</h1>
                    <p id="forum-post-content">{post.content}</p>
                    <div id="forum-details-username">
                        <p>Publicado por: {post.username || 'Anónimo'}</p> 
                    </div>
                    {Array.isArray(post.replies) && post.replies.length > 0 ? (
                        <div className="replies">
                            {post.replies.map((reply, index) => (
                                <div key={index} className="reply">
                                    <p>{reply.content}</p> 
                                    <p>Respondido por: {reply.username }</p> 
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No hay respuestas</p>
                    )}
                    {username && (
                        <form onSubmit={handleReplySubmitWrapper}>
                            <textarea
                                value={newReplyContent}
                                onChange={e => setNewReplyContent(e.target.value)}
                                placeholder="Escribe tu respuesta aquí..."
                                style={{ height: '50px', width: '99%', margin: '10px 0', overflowY: 'scroll' }}
                            />
                            <button type="submit">Responder</button>
                            {replyErrors[postId] && <p style={{ color: 'red' }}>{replyErrors[postId]}</p>}
                        </form>
                    )}
                </>
            ) : (
                <p>Post no encontrado</p>
            )}
        </div>
    );
}

export default ForumDetails;