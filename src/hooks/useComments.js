import { useState, useEffect } from 'react';
import axios from 'axios';

export const useComments = (productId) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        // Obtener comentarios del backend
        fetchComments();
    }, [productId]);

    const fetchComments = () => {
        axios.get(`http://localhost:3000/comentarios/${productId}`)
            .then(response => {
                setComments(response.data);
            })
            .catch(error => {
                console.error('Error al cargar los comentarios:', error);
            });
    };

    const handleAddComment = () => {
        const id_cliente = localStorage.getItem('Id_cliente');
        const id_administrador = localStorage.getItem('Id_administrador');
        if (!id_cliente && !id_administrador) {
            alert('Debes iniciar sesión para añadir un comentario.');
            return;
        }

        const commentData = {
            id_producto: productId,
            comentario: newComment,
            id_cliente: id_cliente ? parseInt(id_cliente) : null,
            id_administrador: id_administrador ? parseInt(id_administrador) : null
        };

        console.log('Adding comment:', commentData); // Log para verificar los datos

        axios.post(`http://localhost:3000/comentarios`, commentData)
            .then(response => {
                setComments([...comments, response.data]);
                setNewComment('');
            })
            .catch(error => {
                console.error('Error al añadir el comentario:', error);
            });
    };

    const handleDeleteComment = (commentId) => {
        const isAdmin = localStorage.getItem('isAdmin') === 'true';
        axios.delete(`http://localhost:3000/comentarios/${commentId}`, {
            headers: {
                'x-is-admin': isAdmin
            }
        })
            .then(response => {
                setComments(comments.filter(comment => comment.id !== commentId));
            })
            .catch(error => {
                console.error('Error al eliminar el comentario:', error);
            });
    };

    return {
        comments,
        newComment,
        setNewComment,
        fetchComments,
        handleAddComment,
        handleDeleteComment
    };
};