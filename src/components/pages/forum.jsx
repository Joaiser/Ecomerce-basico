import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForum } from '../../hooks/useForum'; 
import './forum.css';

export function Foro() {
    const [newPostTitle, setNewPostTitle] = useState('');
    const [newPostContent, setNewPostContent] = useState('');
    const navigate = useNavigate(); 

    const {
        username,
        isAdmin,
        posts,
        newReplyContent,
        setNewReplyContent,
        fetchPosts,
        handlePostSubmit,
        handleReplySubmit
    } = useForum();

    const handlePostSubmitWrapper = (event) => {
        handlePostSubmit(event, newPostTitle, newPostContent, fetchPosts);
        setNewPostTitle('');
        setNewPostContent('');
    };

    const handlePostClick = (postId) => {
        navigate(`/foro/${postId}`);
    };

    return (
        <section id='foro'>
            <h1>Foro</h1>
            <div id='foro-content'>
                <div id='foro-content-presentation'>  
                    <p>
                        Bienvenido a nuestro foro{username ? `, ${username}` : ''}. Aquí puedes compartir tus pensamientos,
                        hacer preguntas e interactuar con otros miembros de nuestra comunidad.
                    </p>
                    {username ? (
                        <form onSubmit={handlePostSubmitWrapper}>
                            <input
                                type="text"
                                value={newPostTitle}
                                onChange={e => setNewPostTitle(e.target.value)}
                                placeholder="Título de la publicación"
                                id='post-title'
                            />
                            <textarea
                                id='post-content'
                                value={newPostContent}
                                onChange={e => setNewPostContent(e.target.value)}
                                placeholder="Escribe tu publicación aquí..."
                            />
                            <button type="submit">Publicar</button>
                        </form>
                    ) : (
                        <p>Debes iniciar sesión para publicar.</p>
                    )}
                </div>
                <div className="post-container">
                    {Array.isArray(posts) && posts.map((post, index) => (
                        <div key={index} className="post">
                            <h2>{post.title}</h2>
                            <p>{post.content}</p>
                            <p>Publicado por: {post.username}</p>
                            {isAdmin && (
                                <button onClick={(e) => { e.stopPropagation(); handleDeletePost(index); }}>Borrar Post</button>
                            )}
                            {Array.isArray(post.replies) && post.replies.map((reply, replyIndex) => (
                                <div key={replyIndex}>
                                    <p>{reply.content}</p>
                                    <p>Respondido por: {reply.username}</p>
                                    {isAdmin && (
                                        <button onClick={(e) => { e.stopPropagation(); handleDeleteReply(index, replyIndex); }}>Borrar respuesta</button>
                                    )}
                                </div>
                            ))}
                            {username && (
                                <form onSubmit={e => handleReplySubmit(e, index, fetchPosts)}>
                                    <textarea
                                        value={newReplyContent[index] || ''}
                                        onChange={e => setNewReplyContent(prevState => ({ ...prevState, [index]: e.target.value }))}
                                        placeholder="Escribe tu respuesta aquí..."
                                        style={{ height: '50px', width: '95%', margin: '10px 0' }}
                                    />
                                    <div id='post-buttons'>
                                    <button type="submit">Responder</button>
                                    <button type="button" onClick={() => handlePostClick(post.id)}>Ver publicación</button>
                                    </div>
                                </form>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}