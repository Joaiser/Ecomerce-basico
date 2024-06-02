import { registerAdminInDB, getAdminInDB } from '../models/mysql/administrer.js';

export async function registerAdmin(req, res) {
    try {
        const username = req.body.username;
        const password = req.body.password;

        const adminData = await registerAdminInDB(username, password);

        res.json({ success: true, admin: adminData });
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
}

export async function loginAdmin(req, res) {
    try {
        const username = req.body.username;
        const password = req.body.password;

        const adminData = await getAdminInDB(username, password);

        if (adminData) {
            res.json({ success: true, admin: adminData });
        } else {
            res.status(401).json({ success: false, message: 'Invalid username or password' });
        }
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
}