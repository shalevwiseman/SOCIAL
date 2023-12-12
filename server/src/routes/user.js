const express = require('express');
const mongoose = require('mongoose');
const { validateUser, userModel } = require('../model/user.js');



const router = express.Router();



// Get all users...
router.get('/', async (req, res) => {
    const users = await userModel.find().sort('username');
    return res.json({
        success: true,
        data: users,
        message: 'Successfully fetched all users!',
        })
});

// Get a single user
router.get('/:id', async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).json({
            success: false,
            data: [],
            message: 'Invalid user id',
        })
    }
    // search for the user in the database
    const user = await userModel.findById(req.params.id);
    // check if user not found then return 404
    if (!user) {
        return res.status(404).json({
            success: false,
            data: [],
            message: 'User not found',
        })
    }
    // return the user object if found
    return res.json({
        success: true,
        data: user,
        message: 'Successfully fetched the user!',
        })
});

// update an existing user
router.put('/:id', async (req, res) => {
    // validate the request body first
    const {error} = validateUser(req.body);
    if (error) {
        return res.status(400).json({
            success: false,
            data: [],
            message: error?.details[0]?.message,
        })
    }
    // find the user by id and update it with the request body
    const user = await userModel.findByIdAndUpdate(req.params.id, {
        username: req.body.username,
        email: req?.body?.email,
        password: req.body.password,
        profilePicture: req.body.profilePicture,
        bio: req.body.bio,
        followers: req.body.followers,
        following: req.body.following,
        posts: req.body.posts,
        isAdmin: req.body.isAdmin
    }, {new: true});
    // check if user not found then return 404
    if (!user) {
        return res.status(404).json({
            success: false,
            data: [],
            message: 'User not found',
        })
    }
    // return the updated user object
    return res.json({
        success: true,
        data: user,
        message: 'Successfully updated the user!',
        })
});

// delete an existing user
router.delete('/:id', async (req, res) => {
    const userId = req.params.id;
    // find the user by id and delete it
    const deletedUser = await userModel.findOneAndDelete({ _id: userId });
    // check if user not found then return 404
    if (!deletedUser) {
        return res.status(404).json({
            success: false,
            data: [],
            message: 'User not found',
        })
    }
    // return the deleted user object
    return res.json({
        success: true,
        data: deletedUser,
        message: 'Successfully deleted the user!',
        })
});



// insert a new user
router.post('/register', async (req, res) => {
    // validate the request body first
    const {error} = validateUser(req.body);
    if (error) { 
        return res.status(400).json({
        success: false,
        data: [],
        message: error?.details[0]?.message,
      })
    }

    // check if the user already exists
    let user = new userModel({
        username: req.body.username,
        email: req?.body?.email,
        password: req.body.password,
        profilePicture: req.body.profilePicture,
        bio: req.body.bio,
        followers: req.body.followers,
        following: req.body.following,
        posts: req.body.posts,
        isAdmin: req.body.isAdmin
    });


    user = await user.save();

    return res.json({
        success: true,
        data: user,
        message: 'New User adding successful!',
      })
});

module.exports = router;