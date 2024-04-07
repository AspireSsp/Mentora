const express = require('express');
const { register, login, getUser, updateMentorProfile, updateMenteeProfile, getAllRatingsOfMentor, getAllUsers, getMentorById } = require('../controller/user');
const {payment, saveTransaction} = require('../controller/payment')
const authenticate = require('../middlewares/auth');
const router = express.Router();

router.route("/register").post(register)
router.route("/login").post(login)
router.route("/get").get(authenticate, getUser);
router.route("/getAll").get(getAllUsers);

// mentor
router.route("/mentor/update").patch(authenticate, updateMentorProfile);
router.route("/mentor/ratings").get(authenticate, getAllRatingsOfMentor);
router.route("/mentor/:id").get(getMentorById);



// mentee
router.route("/mentee/update").patch(authenticate, updateMenteeProfile);


//payment
router.route("/create-payment").post(payment);
router.route("/save-transaction").post(saveTransaction)




module.exports = router; 































// const express = require('express');
// const { registerUser, loginUser } = require("../controller/userController");
// const router = express.Router();


// router.route("/register").post(registerUser)

// router.route("/login").post(loginUser)
 

// module.exports = router; 