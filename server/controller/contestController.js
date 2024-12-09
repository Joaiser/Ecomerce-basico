import { Contest } from '../models/mysql/contest.js'; 

export async function getAllContestantsController(req, res, next) {
  try {
    const contestants = await Contest.getAllContestants();
    res.json(contestants);
  } catch (err) {
    next(err);
  }
}

export async function getContestantByIdController(req, res, next) {
  try {
    const id = req.params.id;
    const contestant = await Contest.getById(id);
    res.json(contestant);
  } catch (err) {
    next(err);
  }
}

export async function registerContestantController(req, res, next) {
  try {
    const username = req.body.username;
    const result = await Contest.register(username);
    if (result.affectedRows > 0) {
      res.json({ success: true, data: result });
    } else {
      res.status(400).json({ success: false, message: 'El nombre de usuario ya está registrado en el concurso.' });
    }
  } catch (err) {
    console.error('Error al registrar el concursante:', err);
    res.status(500).json({ success: false, message: err.message });
  }
}