
const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    name: {
        type: String
    },
    menteeId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },
    mentorId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    }
}, { timestamps: true });

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;