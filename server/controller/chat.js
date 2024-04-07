const Chat = require("../models/chatModel");
const Message = require("../models/messageModel");

// Controller function to create a new chat
exports.createChat = async (req, res) => {
    try {
        const { mentorId } = req.body;
        const menteeId = req.user._id;
        console.log("menteee",menteeId);
        const existingChat = await Chat.findOne({ menteeId, mentorId });

        if (existingChat) {
            return res.status(201).json({ success: true, message: 'Chat already exists', chat: existingChat });
        }else{
            const chat = await Chat.create({ name : "chat-me", menteeId : req.user._id, mentorId });
            res.status(201).json({ success: true, chat });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};



// Controller function to get a chat by ID with mentee and mentor details
exports.getChatById = async (req, res) => {
    try {
        const chat = await Chat.findById(req.params.id)
            .populate('mentorId');
        const messages = await Message.find({ chat: chat._id });
        res.status(200).json({ success: true, chat, messages });
    } catch (error) {
        res.status(404).json({ success: false, error: 'Chat not found' });
    }
};
