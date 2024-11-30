import { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInterceptor.js'; // Importa la instancia personalizada
import cookie from 'js-cookie';
import jwt_decode from 'jwt-decode';

export const useForum = () => {
    const [username, setUsername] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [posts, setPosts] = useState([]);
    const [newReplyContent, setNewReplyContent] = useState({});
    const [error, setError] = useState(''); 

    useEffect(() => {
        const storedAccessToken = localStorage.getItem('accessToken');
        const storedUsername = cookie.get('username');

        if (storedUsername && storedAccessToken) {
            try {
                const decodedToken = jwt_decode(storedAccessToken);
                setIsAdmin(decodedToken?.role === 'admin');
            } catch (error) {
                setError('Error al decodificar el accessToken'); // Aquí estamos usando setError
            }
            setUsername(storedUsername);
        }

        fetchPosts();
    }, []);

    const fetchPosts = () => {
        axiosInstance.get('/posts')
            .then(response => {
                setPosts(response.data);
            })
            .catch(error => {
                setError('Hubo un problema al eliminar la respuesta. Por favor, inténtalo de nuevo más tarde.'); // También aquí
            });
    };

    const handlePostSubmit = (event, newPostTitle, newPostContent) => {
        event.preventDefault();

        const postWithUsername = {
            username,
            title: newPostTitle,
            content: newPostContent,
            parentPostId: null,
        };

        axiosInstance.post('/posts', postWithUsername, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            },
        })
            .then(() => {
                fetchPosts();
            })
            .catch(error => {
                setError('Error al crear publicación'); // Aquí también
            });
    };

    const handleReplySubmit = (event, postId) => {
        event.preventDefault();

        const replyWithUsername = {
            username,
            content: newReplyContent[postId],
        };

        axiosInstance.post(`/posts/${postId}/replies`, replyWithUsername)
            .then(() => {
                fetchPosts();
                setNewReplyContent(prevState => ({ ...prevState, [postId]: '' }));
            })
            .catch(error => {
                setError('Error al crear respuesta:'); // Y aquí
            });
    };

    const handleDeletePost = (postId) => {
        axiosInstance.delete(`/posts/${postId}`)
            .then(() => {
                fetchPosts();
            })
            .catch(error => {
                setError('Error al eliminar publicación'); // Y aquí
            });
    };

    const handleDeleteReply = (postId, replyId) => {
        axiosInstance.delete(`/posts/${postId}/replies/${replyId}`)
            .then(() => {
                fetchPosts();
            })
            .catch(error => {
                setError('Error al eliminar respuesta'); // Y aquí
            });
    };

    return {
        username,
        isAdmin,
        posts,
        newReplyContent,
        setNewReplyContent,
        fetchPosts,
        handlePostSubmit,
        handleReplySubmit,
        handleDeletePost,
        handleDeleteReply,
        error, // Retorna el estado de error
        setError, // Retorna la función para actualizar el estado de error
    };
};
