import { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInterceptor';
import jwtDecode from 'jwt-decode';
import cookie from 'js-cookie';

export const useComments = (productId) => {
    const [comments, setComments] = useState([]); // Estado para almacenar los comentarios
    const [newComment, setNewComment] = useState(''); // Estado para almacenar el nuevo comentario
    const [isAdmin, setIsAdmin] = useState(false); // Estado para almacenar si el usuario es administrador
    const [error, setError] = useState(''); // Estado para almacenar errores
    const [username, setUsername] = useState(''); // Estado para almacenar el nombre de usuario

    useEffect(() => {
        const storedAccessToken = localStorage.getItem('accessToken'); // Obtener el token de acceso del almacenamiento local
        if (storedAccessToken) {
            try {
                const decodedToken = jwtDecode(storedAccessToken); // Decodificar el token de acceso
                setIsAdmin(decodedToken?.role === 'admin'); // Establecer si el usuario es administrador
                setUsername(cookie.get('username')); // Obtener el nombre de usuario de las cookies decideficandolo
            } catch (error) {
                setError('Error al decodificar el accessToken'); // Manejar errores de decodificación
            }
        }
        fetchComments(); // Obtener los comentarios del producto
    }, [productId]);

    const fetchComments = () => {
        axiosInstance.get(`/comentariosProducto/${productId}`)
            .then(response => setComments(response.data)) // Establecer los comentarios en el estado
            .catch(() => setError('Hubo un error al obtener los comentarios del producto')); // Manejar errores
    };

    const handleAddComment = () => {
        if (!newComment.trim()) {
            setError('El comentario no puede estar vacío'); // Validar que el comentario no esté vacío
            return;
        }

        const commentData = {
            id_producto: productId,
            comentario: newComment,
            username: username,
        };

        axiosInstance.post('/comentariosProducto', commentData, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }, // Enviar el token de acceso en los encabezados
        })
            .then(() => {
                fetchComments(); // Actualizar los comentarios después de añadir uno nuevo
                setNewComment(''); // Limpiar el campo de nuevo comentario
            })
            .catch(() => setError('Error al añadir el comentario')); // Manejar errores
    };

    const handleDeleteComment = (commentId) => {
        axiosInstance.delete(`/comentariosProducto/${commentId}`, {
            headers: { 
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`, // Enviar el token de acceso en los encabezados
                'x-is-admin': isAdmin.toString() // Enviar si el usuario es administrador en los encabezados
            },
        })
            .then(() => fetchComments()) // Actualizar los comentarios después de eliminar uno
            .catch(() => setError('Error al eliminar el comentario')); // Manejar errores
    };

    return {
        comments,
        newComment,
        setNewComment,
        fetchComments,
        handleAddComment,
        handleDeleteComment,
        isAdmin,
        error,
    };
};