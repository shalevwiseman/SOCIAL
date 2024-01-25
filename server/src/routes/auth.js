const express = require('express');
const mongoose = require('mongoose');
const { validateUser, userModel } = require('../model/user.js');
const e = require('express');
const bcrypt = require('bcrypt');



const router = express.Router();


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
        password: await bcrypt.hash(req.body.password, 10),
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
