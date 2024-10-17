import { useState, useEffect } from 'react';
import axios from 'axios';

export const useForum = () => {
    const [username, setUsername] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [posts, setPosts] = useState([]);
    const [newReplyContent, setNewReplyContent] = useState({});

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
                // Manejar el error sin imprimir en la consola
                throw error;
            });
    };

    const handlePostSubmit = (event, newPostTitle, newPostContent, fetchPosts) => {
        event.preventDefault();
    
        const postWithUsername = {
            username: username, // Usar el username almacenado
            title: newPostTitle,
            content: newPostContent,
            parentPostId: null
        };
    
        axios.post('http://localhost:3000/posts', postWithUsername)
            .then(response => {
                fetchPosts(); // Volver a obtener las publicaciones después de crear una nueva
            })
            .catch(error => {
                // Manejar el error sin imprimir en la consola
                throw error;
            });
    };

    const handleReplySubmit = (event, postId, fetchPosts) => {
        event.preventDefault();
    
        const replyWithUsername = {
            username: username, // Usar el username almacenado
            content: newReplyContent[postId]
        };
    
        axios.post(`http://localhost:3000/posts/${postId}/replies`, replyWithUsername)
            .then(response => {
                fetchPosts(); // Volver a obtener las publicaciones después de crear una nueva respuesta
                setNewReplyContent(prevState => ({ ...prevState, [postId]: '' }));
            })
            .catch(error => {
                // Manejar el error sin imprimir en la consola
                throw error;
            });
    };

    const handleDeletePost = (postId, fetchPosts) => {
        axios.delete(`http://localhost:3000/posts/${postId}`)
            .then(response => {
                fetchPosts(); // Volver a obtener las publicaciones después de eliminar una
            })
            .catch(error => {
                // Manejar el error sin imprimir en la consola
                throw error;
            });
    };

    const handleDeleteReply = (postId, replyId, fetchPosts) => {
        axios.delete(`http://localhost:3000/posts/${postId}/replies/${replyId}`)
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