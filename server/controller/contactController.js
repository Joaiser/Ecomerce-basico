import { Contact } from '../models/mysql/contact.js'; 

export async function getAllMessagesController(req, res, next) {
  try {
    const messages = await Contact.getAllMessages();
    res.json(messages);
  } catch (err) {
    next(err);
  }
}

export async function getMessageByIdController(req, res, next) {
  try {
    const id = req.params.id;
    const message = await Contact.getById(id);
    res.json(message);
  } catch (err) {
    next(err);
  }
}

export const sendMessageController = async (req, res) => {
  try {
      const { nickname, email, message } = req.body;

      if (!email || !message) {
          return res.status(400).json({ success: false, message: 'El correo electrónico y el mensaje son obligatorios' });
      }

      const result = await Contact.sendMessage(nickname, email, message);
      res.json({ success: true, data: result });
  } catch (err) {
      res.status(500).json({ success: false, message: err.message });
  }
};

