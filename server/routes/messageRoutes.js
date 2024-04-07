const express = require('express');
const authenticate = require('../middlewares/auth');
const { createMessage } = require('../controller/message');
const router = express.Router();

router.route("/add").post(createMessage)


module.exports = router; 