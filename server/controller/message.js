const Message = require("../models/messageModel");

exports.createMessage = async (req, res) => {
    try {
        const { type, content, chat, sender } = req.body;
        const newMessage = await Message.create({ type, content, chat, sender });
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


exports.getAllMessagesFromChat = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Query the Message model to find messages associated with the chat ID
      const messages = await Message.find({ chat: id });
  
      // Return the messages as a response
      res.status(200).json({
        success: true,
        messages: messages,
      });
    } catch (error) {
      console.error('Error fetching messages:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
      });
    }
  };