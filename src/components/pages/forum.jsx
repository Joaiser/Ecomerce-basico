import React, { useState, useEffect } from 'react';
import './forum.css';

export function Foro() {
    const [newPostTitle, setNewPostTitle] = useState('');
    const [newPostContent, setNewPostContent] = useState('');
    const [username, setUsername] = useState(null);
    const [newReplyContent, setNewReplyContent] = useState({});
    const [isAdmin, setIsAdmin] = useState(false);
    const [posts, setPosts] = useState(() => JSON.parse(localStorage.getItem('posts')) || []);

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        const storedIsAdmin = localStorage.getItem('isAdmin') === 'true';
        if (storedUsername) {
            setUsername(storedUsername);
            setIsAdmin(storedIsAdmin);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('posts', JSON.stringify(posts));
    }, [posts]);

    const handlePostSubmit = event => {
        event.preventDefault();
    
        const postWithUsername = {
            title: newPostTitle,
            content: newPostContent,
            username: username,
            replies: []
        };
    
        setPosts([...posts, postWithUsername]);
        setNewPostTitle('');
        setNewPostContent('');
    };

    const handleReplySubmit = (event, postIndex) => {
        event.preventDefault();

        const replyWithUsername = {
            content: newReplyContent[postIndex],
            username: username
        };

        const updatedPosts = [...posts];
        updatedPosts[postIndex].replies = [...updatedPosts[postIndex].replies, replyWithUsername];
        setPosts(updatedPosts);
        setNewReplyContent(prevState => ({ ...prevState, [postIndex]: '' }));
    };

    const handleDeletePost = (postIndex) => {
        const updatedPosts = [...posts];
        updatedPosts.splice(postIndex, 1);
        setPosts(updatedPosts);
    };

    const handleDeleteReply = (postIndex, replyIndex) => {
        const updatedPosts = [...posts];
        updatedPosts[postIndex].replies.splice(replyIndex, 1);
        setPosts(updatedPosts);
    };

    return (
        <section id='foro'>
            <h1>Foro</h1>
            <div id='foro-content'>
                <p>
                    Bienvenido a nuestro foro{username ? `, ${username}` : ''}. Aquí puedes compartir tus pensamientos,
                    hacer preguntas e interactuar con otros miembros de nuestra comunidad.
                </p>    
                {username ? (
                    <form onSubmit={handlePostSubmit}>
                        <input type="text" value={newPostTitle} onChange={e => setNewPostTitle(e.target.value)} placeholder="Título de la publicación" />
                        <textarea value={newPostContent} onChange={e => setNewPostContent(e.target.value)} placeholder="Escribe tu publicación aquí..." />
                        <button type="submit">Publicar</button>
                    </form>
                ) : (
                    <p>Debes iniciar sesión para publicar.</p>
                )}
                <div className="post-container">
                {Array.isArray(posts) && posts.map((post, index) => (
                    <div key={index} className="post">
                        <h2>{post.title}</h2>
                        <p>{post.content}</p>
                        <p>Publicado por: {post.username}</p>
                        {isAdmin && (
                            <button onClick={() => handleDeletePost(index)}>Borrar Post</button>
                        )}
                        {Array.isArray(post.replies) && post.replies.map((reply, replyIndex) => (
                            <div key={replyIndex}>
                                <p>{reply.content}</p>
                                <p>Respondido por: {reply.username}</p>
                                {isAdmin && (
                                    <button onClick={() => handleDeleteReply(index, replyIndex)}>Borrar respuesta</button>
                                )}
                            </div>
                        ))}
                        {username && (
                            <form onSubmit={e => handleReplySubmit(e, index)}>
                                <textarea 
                                    value={newReplyContent[index] || ''} 
                                    onChange={e => setNewReplyContent(prevState => ({ ...prevState, [index]: e.target.value }))}
                                    placeholder="Escribe tu respuesta aquí..." 
                                    style={{  width: '400px', height: '50px' }} 
                                />
                                <button type="submit">Responder</button>
                            </form>
                        )}
                    </div>
                ))}
                </div>
            </div>
        </section>
    );
}