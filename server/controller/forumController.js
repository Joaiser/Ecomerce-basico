import { createPost, getPosts, deletePost, createReply, deleteReply } from '../models/mysql/forum.js';

export async function createPostController(req, res) {
    const { userId, title, content, parentPostId } = req.body;

    if (userId === undefined || title === undefined || content === undefined) {
        res.status(400).json({ message: 'Faltan datos necesarios' });
        return;
    }

    try {
        const result = await createPost(userId, title, content, parentPostId);
        res.status(201).json({ message: 'Post creado exitosamente', postId: result.insertId });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el post', error });
    }
}

export async function getPostsController(req, res) {
    try {
        const posts = await getPosts();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los posts', error });
    }
}

export async function deletePostController(req, res) {
    const { postId } = req.params;

    try {
        await deletePost(postId);
        res.status(200).json({ message: 'Post eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el post', error });
    }
}

export async function createReplyController(req, res) {
    const { postId } = req.params;
    const { userId, content } = req.body;

    if (userId === undefined || content === undefined) {
        res.status(400).json({ message: 'Faltan datos necesarios' });
        return;
    }

    try {
        const result = await createReply(postId, userId, content);
        res.status(201).json({ message: 'Respuesta creada exitosamente', replyId: result.insertId });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la respuesta', error });
    }
}

export async function deleteReplyController(req, res) {
    const { replyId } = req.params;

    try {
        await deleteReply(replyId);
        res.status(200).json({ message: 'Respuesta eliminada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la respuesta', error });
    }
}