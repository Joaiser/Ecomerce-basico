import { createPost, getPosts, deletePost, createReply, deleteReply, getUserIdByUsername, deleteRepliesByPostId } from '../models/mysql/forum.js';

export async function createPostController(req, res) {
    const { username, title, content, parentPostId } = req.body;

    if (username === undefined || title === undefined || content === undefined) {
        res.status(400).json({ message: 'Faltan datos necesarios' });
        return;
    }

    try {
        const userId = await getUserIdByUsername(username);
        console.log('User ID:', userId); // Agregar log de userId
        const result = await createPost(userId, title, content, parentPostId);
        console.log('Create Post Result:', result); // Agregar log de resultado de creación de post
        res.status(201).json({ message: 'Post creado exitosamente', postId: result.insertId });
    } catch (error) {
        console.error('Error al crear el post:', error); // Agregar log de error
        res.status(500).json({ message: 'Error al crear el post', error });
    }
}

export async function getPostsController(req, res) {
    try {
        const posts = await getPosts();
        res.status(200).json(posts);
    } catch (error) {
        console.error('Error al obtener los posts:', error); // Agregar log de error
        res.status(500).json({ message: 'Error al obtener los posts', error });
    }
}

export async function deletePostController(req, res) {
    const { postId } = req.params;

    try {
        // Eliminar todas las respuestas asociadas al post
        await deleteRepliesByPostId(postId);
        
        // Eliminar el post
        await deletePost(postId);
        
        res.status(200).json({ message: 'Post y respuestas eliminados exitosamente' });
    } catch (error) {
        console.error('Error al eliminar el post y sus respuestas:', error); // Agregar log de error
        res.status(500).json({ message: 'Error al eliminar el post y sus respuestas', error });
    }
}

export async function createReplyController(req, res) {
    const { postId } = req.params;
    const { username, content } = req.body;

    if (username === undefined || content === undefined) {
        res.status(400).json({ message: 'Faltan datos necesarios' });
        return;
    }

    try {
        const userId = await getUserIdByUsername(username);
        const result = await createReply(postId, userId, content);
        res.status(201).json({ message: 'Respuesta creada exitosamente', replyId: result.insertId });
    } catch (error) {
        console.error('Error al crear la respuesta:', error); // Agregar log de error
        res.status(500).json({ message: 'Error al crear la respuesta', error });
    }
}

export async function deleteReplyController(req, res) {
    const { replyId } = req.params;

    try {
        await deleteReply(replyId);
        res.status(200).json({ message: 'Respuesta eliminada exitosamente' });
    } catch (error) {
        console.error('Error al eliminar la respuesta:', error); // Agregar log de error
        res.status(500).json({ message: 'Error al eliminar la respuesta', error });
    }
}
