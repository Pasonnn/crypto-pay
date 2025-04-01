// ./services/auth/api/authModel.js

const { TokenExpiredError } = require('jsonwebtoken');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for User with fields and validation
const userSchema = new Schema({
    name: {
        type: String,
        required: 'Name cannot be empty',
    },
    email: {
        type: String,
        required: 'Email cannot be empty',
        unique: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    },
    password: {
        type: String,
        required: 'Password cannot be empty',
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },    
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {timestamps: true});

const refreshTokenSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    expiresAt: {
        type: Date,
        required: true,
    },
    revoked: {
        type: Boolean,
        default: false,
    }
}, {timestamps: true});

// Create models
const User = mongoose.model('User', userSchema);
const RefreshToken = mongoose.model('RefreshToken', refreshTokenSchema);

// Export both models
module.exports = {
    User,
    RefreshToken
};
