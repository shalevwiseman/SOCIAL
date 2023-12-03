const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30,
        unique: true
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    profilePicture: {
        type: String,
        default: ''
    },
    bio: {
        type: String,
        default: ''
    },
    followers: {
        type: [mongoose.Schema.Types.ObjectId],
        default: []
    },
    following: {
        type: [mongoose.Schema.Types.ObjectId],
        default: []
    },
    posts: {
        type: [mongoose.Schema.Types.ObjectId],
        default: []
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
    
});

// create a model by mogoose
const userModel = mongoose.model('User', userSchema);

// initialing the schema for validation parameters
const joiUserSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().min(5).max(50).required().email(),
    password: Joi.string().min(8).required(),
    profilePicture: Joi.string(),
    bio: Joi.string(),
    followers: Joi.array(),
    following: Joi.array(),
    posts: Joi.array(),
    isAdmin: Joi.boolean()
});

// validation using Joi & finally return the result of validation
const validateUser = (user) => joiUserSchema.validate(user);

module.exports = {
    validateUser,
    userModel
};
