const Chat = require("../models/chatModel");

exports.createChat = async (req, res) => {
    try {
        const { name, members } = req.body;
        const newChat = await Chat.create({ name, members });
        res.status(201).json(newChat);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}