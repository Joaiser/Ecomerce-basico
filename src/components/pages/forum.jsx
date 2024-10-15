import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './forum.css';

export function Foro() {
    const [newPostTitle, setNewPostTitle] = useState('');
    const [newPostContent, setNewPostContent] = useState('');
    const [username, setUsername] = useState(null);
    const [newReplyContent, setNewReplyContent] = useState({});
    const [isAdmin, setIsAdmin] = useState(false);
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate(); 

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        const storedIsAdmin = localStorage.getItem('isAdmin') === 'true';
        if (storedUsername) {
            setUsername(storedUsername);
            setIsAdmin(storedIsAdmin);
        }

        // Obtener publicaciones del backend
        fetchPosts();
    }, []);

    const fetchPosts = () => {
        axios.get('http://localhost:3000/posts')
            .then(response => {
                setPosts(response.data);
            })
            .catch(error => {
                console.error('Error al obtener publicaciones:', error);
            });
    };

    const handlePostSubmit = event => {
        event.preventDefault();
    
        const postWithUsername = {
            username: username, // Usar el username almacenado
            title: newPostTitle,
            content: newPostContent,
            parentPostId: null
        };
    
        console.log('Datos de la publicación:', postWithUsername); // Verificar los datos
    
        axios.post('http://localhost:3000/posts', postWithUsername)
            .then(response => {
                fetchPosts(); // Volver a obtener las publicaciones después de crear una nueva
                setNewPostTitle('');
                setNewPostContent('');
            })
            .catch(error => {
                console.error('Error al crear publicación:', error);
            });
    };
    
    const handleReplySubmit = (event, postIndex) => {
        event.preventDefault();
    
        const replyWithUsername = {
            username: username, // Usar el username almacenado
            content: newReplyContent[postIndex]
        };
    
        const postId = posts[postIndex].id;
    
        console.log('Datos de la respuesta:', replyWithUsername); //Verificar los datos
    
        axios.post(`http://localhost:3000/posts/${postId}/replies`, replyWithUsername)
            .then(response => {
                fetchPosts(); // Volver a obtener las publicaciones después de crear una nueva respuesta
                setNewReplyContent(prevState => ({ ...prevState, [postIndex]: '' }));
            })
            .catch(error => {
                console.error('Error al crear respuesta:', error);
            });
    };

    const handleDeletePost = postIndex => {
        const postId = posts[postIndex].id;

        axios.delete(`http://localhost:3000/posts/${postId}`)
            .then(() => {
                fetchPosts(); // Volver a obtener las publicaciones después de eliminar una
            })
            .catch(error => {
                console.error('Error al eliminar publicación:', error);
            });
    };

    const handleDeleteReply = (postIndex, replyIndex) => {
        const postId = posts[postIndex].id;
        const replyId = posts[postIndex].replies[replyIndex].id;

        axios.delete(`http://localhost:3000/posts/${postId}/replies/${replyId}`)
            .then(response => {
                fetchPosts(); // Volver a obtener las publicaciones después de eliminar una respuesta
            })
            .catch(error => {
                console.error('Error al eliminar respuesta:', error);
            });
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
                        <form onSubmit={handlePostSubmit}>
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
                                <form onSubmit={e => handleReplySubmit(e, index)}>
                                    <textarea
                                        value={newReplyContent[index] || ''}
                                        onChange={e => setNewReplyContent(prevState => ({ ...prevState, [index]: e.target.value }))}
                                        placeholder="Escribe tu respuesta aquí..."
                                        style={{ height: '50px', width: '95%', margin: '10px 0' }}
                                    />
                                    <div id='post-buttons'>
                                    <button type="submit">Responder</button>
                                    <button onClick={()=> handlePostClick(post.id)}>Ver publicación</button>
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