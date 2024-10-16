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

    const {
        username,
        isAdmin,
        fetchPosts,
        handleReplySubmit
    } = useForum();

    useEffect(() => {
        console.log(`Fetching post details for postId: ${postId}`);
        axios.get(`http://localhost:3000/posts/${postId}`)
            .then(response => {
                console.log('Post details fetched:', response.data);
                setPost(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching post details:', error);
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

        console.log('Submitting reply:', replyWithUsername);

        axios.post(`http://localhost:3000/posts/${postId}/replies`, replyWithUsername)
            .then(response => {
                console.log('Reply submitted:', response.data);
                setNewReplyContent('');
                fetchPostDetails(); // Volver a obtener los detalles del post después de crear una nueva respuesta
            })
            .catch(error => {
                console.error('Error al crear respuesta:', error);
            });
    };

    const fetchPostDetails = () => {
        console.log(`Fetching post details for postId: ${postId}`);
        axios.get(`http://localhost:3000/posts/${postId}`)
            .then(response => {
                console.log('Post details fetched:', response.data);
                setPost(response.data);
            })
            .catch(error => {
                console.error('Error fetching post details:', error);
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
                    <p>{post.content}</p>
                    <p>Publicado por: {post.username || 'Anónimo'}</p> {/* Mostrar 'Anónimo' si no hay username */}
                    {Array.isArray(post.replies) && post.replies.length > 0 ? (
                        <div className="replies">
                            <h2>Respuestas</h2>
                            {post.replies.map((reply, index) => (
                                <div key={index} className="reply">
                                    <p>{reply.content}</p>
                                    <p>Respondido por: {reply.username || 'Anónimo'}</p> {/* Mostrar 'Anónimo' si no hay username */}
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
                                style={{ height: '50px', width: '95%', margin: '10px 0' }}
                            />
                            <button type="submit">Responder</button>
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