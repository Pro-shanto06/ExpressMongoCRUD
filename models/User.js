const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require("bcryptjs")

const UserSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: [true, 'First name is required'],
        trim: true,
        minlength: [3, 'First name must be at least 3 characters long']
    },
    lname: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true,
        minlength: [3, 'Last name must be at least 3 characters long']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: (email) => validator.isEmail(email),
            message: 'Please enter a valid email'
        }
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        minlength: [11, 'Phone number must be exactly 11 characters long'],
        validate: {
            validator: function(phone) {
                return /^01\d{9}$/.test(phone);
            },
            message: 'Please enter a valid phone number starting with 01'
        }
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters long'],
        validate: {
            validator: function(password) {
                const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
                return passwordRegex.test(password);
            },
            message: 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character'
        }
    },
    userType: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active',
    }
}, { timestamps: true });


UserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

module.exports = mongoose.model('User', UserSchema);
