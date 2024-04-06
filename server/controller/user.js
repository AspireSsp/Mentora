const bcrypt = require('bcryptjs');
const { User, Mentee, Mentor } = require('../models/userModel');

exports.register = async (req, res) => {
    try {
        const { name, email, password, mobile, role } = req.body;
        if (!name || !email || !password || !mobile || !role) {
            return res.status(422).json({
                error: "Unprocessable Entity",
                message: !name ? "name is required." : !email ? "email is required." : !mobile ? "mobile no. is required." : !password ? "password is required." : "role is required."
            });
        }

        // Check if user with the provided email already exists
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(422).json({
                error: "Conflict",
                message: "User with the provided email already exists."
            });
        }

        // Derive username from email
        let userName = email.split('@')[0];

        // Create new user (either mentee or mentor based on role)
        let newUser;
        if (role === 'mentee') {
            newUser = new Mentee({ name, email, password, mobile, userName });
        } else if (role === 'mentor') {
            newUser = new Mentor({ name, email, password, mobile, userName });
        } else {
            return res.status(422).json({
                error: "Unprocessable Entity",
                message: "Invalid role. Role must be 'mentee' or 'mentor'."
            });
        }

        // Save user to the database
        const savedUser = await newUser.save();

        // Generate authentication token
        const token = await savedUser.generateAuthToken();

        res.status(200).json({
            success: true,
            message: "New user created successfully.",
            user: savedUser,
            token,
        });
    } catch (error) {
        res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        });
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(422).json(
                { 
                    error : "Unprocessable Entity",
                    message: !email ? "email is required." : "password is required." 
                }
            )
        }
        const user = await User.findOne({ email }).select("+password");
        if(!user){
            return res.status(404).json(
                {
                    error : 'Not Found',
                    message: 'User not found.' 
                }
            )
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json(
                { 
                    error: 'Unauthorized', 
                    message: 'Invalid username or password.' 
                }
            );
        } else {
            let token = await user.generateAuthToken();
            res.status(200).json(
                { 
                    success : true,
                    message: "login successfull", 
                    user,
                    token,
                }
            )
        }   
    } catch (error) {
        res.status(500).json(
            { 
                error: 'Internal Server Error', 
                message: error.message
            }
        );
    }
}

exports.getUser = async (req, res) => {
    try {   
        res.status(200).json(
            { 
                success : true,
                message: "User retrieval successful", 
                user: req.user,
                token: req.token,
            }
        )
    } catch (error) {
        res.status(500).json(
            { 
                error: 'Internal Server Error', 
                message: error.message
            }
        );
    }
}

exports.updateMentorProfile = async (req, res) => {
    try {
       
        // Find mentor by ID
        const mentor = await Mentor.findById(req.user._id);

        // Check if mentor exists
        if (!mentor) {
            return res.status(404).json({
                error: "Not Found",
                message: "Mentor not found."
            });
        }
        console.log(req.body);
        // Save updated mentor profile
        const updateMentor = await Mentor.findByIdAndUpdate(req.user._id, req.body, { new: true });

        res.status(200).json({
            success: true,
            message: "Mentor profile updated successfully.",
            mentor
        });
    } catch (error) {
        res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        });
    }
};

exports.updateMenteeProfile = async (req, res) => {
    try {
        const { id } = req.user._id;
        const updates = req.body;

        const mentee = await Mentee.findByIdAndUpdate(id, updates, { new: true });

        if (!mentee) {
            return res.status(404).json({ error: "Not Found", message: "Mentee not found" });
        }

        res.status(200).json({ success: true, message: "Mentee profile updated successfully", mentee });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
};

