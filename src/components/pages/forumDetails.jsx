import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./forumDetails.css";

export function ForumDetails() {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newReplyContent, setNewReplyContent] = useState('');
    const [username, setUsername] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        const storedIsAdmin = localStorage.getItem('isAdmin') === 'true';
        if (storedUsername) {
            setUsername(storedUsername);
            setIsAdmin(storedIsAdmin);
        }

        axios.get(`http://localhost:3000/posts/${postId}`)
            .then(response => {
                const post = response.data;
                post.username = storedUsername; // Asigna el username almacenado al post
                setPost(post);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, [postId]);

    const handleReplySubmit = (event) => {
        event.preventDefault();

        const replyWithUsername = {
            username: username, // Usar el username almacenado
            content: newReplyContent
        };

        axios.post(`http://localhost:3000/posts/${postId}/replies`, replyWithUsername)
            .then(response => {
                setPost(prevPost => ({
                    ...prevPost,
                    replies: [...prevPost.replies, response.data]
                }));
                setNewReplyContent('');
            })
            .catch(error => {
                console.error('Error al crear respuesta:', error);
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
                    <p>Publicado por: {post.username}</p>
                    {Array.isArray(post.replies) && post.replies.length > 0 && (
                        <div className="replies">
                            <h2>Respuestas</h2>
                            {post.replies.map((reply, index) => (
                                <div key={index} className="reply">
                                    <p>{reply.content}</p>
                                    <p>Respondido por: {reply.username}</p>
                                </div>
                            ))}
                        </div>
                    )}
                    {username && (
                        <form onSubmit={handleReplySubmit}>
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



//ESTO HAY QUE ARREGLAR QUE COJA EL USERNAME DEL LOCALSTORAGE   