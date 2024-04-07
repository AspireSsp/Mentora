const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Your Name"],
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
        validate: [validator.isEmail, "Please Enter a valid Email"]
    },
    userName: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: [true, "Please Enter Your Mobile"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please Enter your password"],
        select: false,
    },
    pic: {
        type: String,
        default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    },
    createdAt:{
        type: Date,
        default: Date.now(),
    }

},{ discriminatorKey: 'role', toJSON: { virtuals: true }, toObject: { virtuals: true } });


//hashing the password...
userSchema.pre('save',async function (next){
    if(this.isModified('password')){
        this.password =await bcrypt.hash(this.password, 12)
    }
    next();
});

// Generating token
userSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
        await this.save();
        return token;
    } catch (error) {
        throw new Error(error);
    }
};

//  token to reset password
userSchema.methods.createPasswordResetToken = async function () {
    const resetToken = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000; //10 minutes
    return resetToken;
};

// Define a discriminator key
const options = { discriminatorKey: 'role' };

// Define the mentee schema
const menteeSchema = new mongoose.Schema({
    profession: String,
    bio: String,
    education: String,
    address: String,
    gender: String,
    wallet: Number,
}, options);

// Define the mentor schema
const mentorSchema = new mongoose.Schema({
    wallet : Number,
    title: String,
    bio: String,
    age: String,
    address: String,
    gender: String,
    active: {
        type: Boolean,
        default: false,
    },    
    engaged: {
        type: Boolean,
        default: false,
    },    
    education: [
        {
            school: String,
            degree: String,
            field: String,
            startDate: Date,
            endDate: Date,
        }
    ],
    experience: [
        {
            role: String,
            company: String,
            startDate: Date,
            endDate: Date,
        }
    ],
    ratings: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            rating: Number,
            comment: String,
            createdAt: {
                type: Date,
                default: Date.now()
            }
        }
    ],
    transactions: [
        {
            transactionId: String,
            amount: Number,
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ]
}, options);

// Create models
const User = mongoose.model('User', userSchema);
const Mentee = User.discriminator('Mentee', menteeSchema);
const Mentor = User.discriminator('Mentor', mentorSchema);

module.exports = {
    User,
    Mentee,
    Mentor
};

