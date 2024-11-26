import { useState, useEffect } from 'react';
import axios from 'axios';
import cookie from 'js-cookie';
import jwt_decode from 'jwt-decode'; 

export const useForum = () => {
    const [username, setUsername] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [posts, setPosts] = useState([]);
    const [newReplyContent, setNewReplyContent] = useState({});

    const storedAccessToken = localStorage.getItem('accessToken');

    useEffect(() => {
        // Obtener los datos del usuario y rol desde las cookies
        const storedUsername = cookie.get('username');

        if (storedUsername && storedAccessToken) {
            try {
                const decodedToken = jwt_decode(storedAccessToken);
                const userIsAdmin = decodedToken?.role === 'admin';
                setIsAdmin(userIsAdmin);
            } catch (error) {
                console.error("Error al decodificar el accessToken:", error);
            }
            
            setUsername(storedUsername);
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
            // Manejar el error sin imprimir en la consola
            throw error;
        });
    };

    const handlePostSubmit = (event, newPostTitle, newPostContent) => {
        event.preventDefault();
    
        const postWithUsername = {
            username: username, // Usar el username almacenado en la cookie
            title: newPostTitle,
            content: newPostContent,
            parentPostId: null
        };
    
        axios.post('http://localhost:3000/posts', postWithUsername, {
            headers: {
                'Authorization': `Bearer ${storedAccessToken}` 
            }
        })
        .then(response => {
            fetchPosts(); // Volver a obtener las publicaciones después de crear una nueva
        })
        .catch(error => {
            // Manejar el error sin imprimir en la consola
            throw error;
        });
    };

    const handleReplySubmit = (event, postId) => {
        event.preventDefault();
    
        const replyWithUsername = {
            username: username, // Usar el username almacenado en la cookie
            content: newReplyContent[postId]
        };
    
        axios.post(`http://localhost:3000/posts/${postId}/replies`, replyWithUsername, {
            headers: {
                'Authorization': `Bearer ${storedAccessToken}`
            }
        })
        .then(response => {
            fetchPosts(); // Volver a obtener las publicaciones después de crear una nueva respuesta
            setNewReplyContent(prevState => ({ ...prevState, [postId]: '' }));
        })
        .catch(error => {
            // Manejar el error sin imprimir en la consola
            throw error;
        });
    };

    const handleDeletePost = (postId) => {
        axios.delete(`http://localhost:3000/posts/${postId}`, {
            headers: {
                'Authorization': `Bearer ${storedAccessToken}`
            }
        })
        .then(response => {
            fetchPosts(); // Volver a obtener las publicaciones después de eliminar una
        })
        .catch(error => {
            // Manejar el error sin imprimir en la consola
            throw error;
        });
    };

    const handleDeleteReply = (postId, replyId) => {
        axios.delete(`http://localhost:3000/posts/${postId}/replies/${replyId}`, {
            headers: {
                'Authorization': `Bearer ${storedAccessToken}`
            }
        })
        .then(response => {
            fetchPosts(); // Volver a obtener las publicaciones después de eliminar una respuesta
        })
        .catch(error => {
            // Manejar el error sin imprimir en la consola
            throw error;
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
        handleDeleteReply
    };
};