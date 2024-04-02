
exports.createMessage = async (req, res) => {
    try {
        const { type, content, chat, sender } = req.body;
        const newMessage = await Message.create({ type, content, chat, sender });
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


