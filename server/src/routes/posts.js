const express = require('express');
const mongoose = require('mongoose');
const Post = require('../model/post.js');
const e = require('express');



const router = express.Router();


// create a post
router.post("/", async (req, res) => {
    const newPost = new Post(req.body);
    try {
      const savedPost = await newPost.save();
      res.status(200).json(savedPost);
    } catch (err) {
      res.status(500).json(err);
    }
  });


// update a post
router.put('/:id', async (req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        if(post.userId === req.body.userId){
            await post.updateOne({$set: req.body});
            res.status(200).json('The post has been updated');
        } else {
            res.status(403).json('You can update only your post');
        }
    } catch (error) {
        return res.status(500).json(error);
    }
});

// delete a post
// like a post / unlike a post
// get a post
// get timeline posts

module.exports = router;