const express = require('express');
const authenticate = require('../middlewares/auth');
const { createMessage, getAllMessagesFromChat } = require('../controller/message');
const router = express.Router();

router.route("/add").post(createMessage)
router.route("/chat/:id").get(getAllMessagesFromChat);


module.exports = router; 