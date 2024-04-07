const express = require('express');
const authenticate = require('../middlewares/auth');
const { createChat, getChatById } = require('../controller/chat');
const router = express.Router();

router.route("/add").post(authenticate, createChat)
router.route("/get/:id").get(authenticate, getChatById)



module.exports = router; 

