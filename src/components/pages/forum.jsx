import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForum } from '../../hooks/useForum'; 
import './forum.css';

export function Foro() {
    const [newPostTitle, setNewPostTitle] = useState('');
    const [newPostContent, setNewPostContent] = useState('');
    const [error, setError] = useState('');
    const [postErrors, setPostErrors] = useState({});
    const [replyErrors, setReplyErrors] = useState({});
    const navigate = useNavigate(); 

    const {
        username,
        isAdmin,
        posts,
        newReplyContent,
        setNewReplyContent,
        fetchPosts,
        handlePostSubmit,
        handleReplySubmit,
        handleDeletePost,
        handleDeleteReply
    } = useForum();

    const MAX_TITLE_LENGTH = 100; // Define el máximo de caracteres para el título
    const MAX_CONTENT_PREVIEW_LENGTH = 200; // Define el máximo de caracteres para el contenido de vista previa

    const handlePostSubmitWrapper = (event) => {
        event.preventDefault();
        if (newPostTitle.trim() === '') {
            setError('El título es obligatorio');
            return;
        }
        if (newPostTitle.length > MAX_TITLE_LENGTH) {
            setError(`El título no puede tener más de ${MAX_TITLE_LENGTH} caracteres`);
            return;
        }
        setError('');
        handlePostSubmit(event, newPostTitle, newPostContent, fetchPosts);
        setNewPostTitle('');
        setNewPostContent('');
    };

    const handlePostClick = (postId) => {
        navigate(`/foro/${postId}`);
    };

    const handleDeletePostWrapper = async (postId) => {
        try {
            await handleDeletePost(postId, fetchPosts);
            setPostErrors(prevErrors => ({ ...prevErrors, [postId]: '' }));
        } catch (error) {
            setPostErrors(prevErrors => ({ ...prevErrors, [postId]: 'Error al eliminar la publicación' }));
        }
    };

    const handleDeleteReplyWrapper = async (postId, replyId) => {
        try {
            await handleDeleteReply(postId, replyId, fetchPosts);
            setReplyErrors(prevErrors => ({ ...prevErrors, [replyId]: '' }));
        } catch (error) {
            setReplyErrors(prevErrors => ({ ...prevErrors, [replyId]: 'Error al eliminar la respuesta' }));
        }
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
                                required
                            />
                            {error && <p style={{ color: 'red' }}>{error}</p>}
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
                            <p>
                                {post.content.length > MAX_CONTENT_PREVIEW_LENGTH
                                    ? (
                                        <>
                                            {post.content.substring(0, MAX_CONTENT_PREVIEW_LENGTH)}
                                            <span>...</span>
                                        </>
                                    )
                                    : post.content}
                            </p>
                            {error && <div className="error-message">{error}</div>}
                            <p>Publicado por: {post.username}</p>
                            {isAdmin && (
                                <>
                                    <button onClick={(e) => { e.stopPropagation(); handleDeletePostWrapper(post.id); }}>Borrar Post</button>
                                    {postErrors[post.id] && <p style={{ color: 'red' }}>{postErrors[post.id]}</p>}
                                </>
                            )}
                            {Array.isArray(post.replies) && post.replies.map((reply, replyIndex) => (
                                <div key={replyIndex}>
                                    <p>{reply.content.substring(0,MAX_CONTENT_PREVIEW_LENGTH)}<span>...</span></p>
                                    <p>Respondido por: {reply.username}</p>
                                    {isAdmin && (
                                        <>
                                            <button onClick={(e) => { e.stopPropagation(); handleDeleteReplyWrapper(post.id, reply.id); }}>Borrar respuesta</button>
                                            {replyErrors[reply.id] && <p style={{ color: 'red' }}>{replyErrors[reply.id]}</p>}
                                        </>
                                    )}
                                </div>
                            ))}
                            {username && (
                                <form onSubmit={e => handleReplySubmit(e, post.id, fetchPosts)}>
                                    <textarea
                                        value={newReplyContent[post.id] || ''}
                                        onChange={e => setNewReplyContent(prevState => ({ ...prevState, [post.id]: e.target.value }))}
                                        placeholder="Escribe tu respuesta aquí..."
                                        style={{ height: '50px', width: '95%', margin: '10px 0' }}
                                    />
                                    <div id='post-buttons'>
                                        <button type="submit">Responder</button>
                                        {error && <div className="error-message">{error}</div>}
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
