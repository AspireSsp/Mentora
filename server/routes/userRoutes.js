const express = require('express');
const { register, login, getUser, updateMentorProfile, updateMenteeProfile, getAllRatingsOfMentor } = require('../controller/user');
const authenticate = require('../middlewares/auth');
const router = express.Router();

router.route("/register").post(register)
router.route("/login").post(login)
router.route("/get").get(authenticate, getUser);
// mentor
router.route("/mentor/update").patch(authenticate, updateMentorProfile);
router.route("/mentor/ratings").get(authenticate, getAllRatingsOfMentor);



// mentee
router.route("/mentee/update").patch(authenticate, updateMenteeProfile);


module.exports = router; 































// const express = require('express');
// const { registerUser, loginUser } = require("../controller/userController");
// const router = express.Router();


// router.route("/register").post(registerUser)

// router.route("/login").post(loginUser)
 

// module.exports = router; 