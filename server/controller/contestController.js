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
      console.log(result);
      if (result.affectedRows > 0) {
        res.json({ success: true, data: result });
      } else {
        res.json({ success: false });
      }
    } catch (err) {
      next(err);
    }
}