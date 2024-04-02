// models/messageModel.js

const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    type: {
        type: String, // "text" for text messages, "file" for file messages
        enum: ['text', 'file'],
        required: true,
    },
    content: {
        type : String, // The actual message content or file path
    },  
    chat: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Chat', 
    },
    sender: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
    },
    seen: {
        type: Boolean,
        default: false, // Default to false indicating the message is unseen
    }
}, { timestamps: true });

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;

