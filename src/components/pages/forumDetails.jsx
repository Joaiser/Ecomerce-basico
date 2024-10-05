import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./forumDetails.css";

export function ForumDetails() {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
                </>
            ) : (
                <p>Post no encontrado</p>
            )}
        </div>
    );
}