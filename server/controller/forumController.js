import { createPost, getPosts } from '../models/mysql/forum.js'; 
export async function createPostController(req, res) {
    const { userId, title, content, parentPostId } = req.body;

    // Comprobar si los datos necesarios están definidos
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