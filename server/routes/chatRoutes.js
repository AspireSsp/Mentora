const express = require('express');
const authenticate = require('../middlewares/auth');
const { createChat, getChatById, getMyChats } = require('../controller/chat');
const router = express.Router();

router.route("/add").post(authenticate, createChat)
router.route("/get/:id").get(authenticate, getChatById)


//mentore
router.route("/getmychat").get(authenticate, getMyChats)



module.exports = router; 

