const express = require('express');
const passport = require('passport');
const router = express.Router();
const users = require('../model/user.js');






// Define the sign-in route
router.post('/signin', passport.authenticate('local', {
    successRedirect: '/api/signin',
    failureRedirect: '/api/signin',
    failureFlash: true
})
);

router.get('/test', (req, res) => {
    res.send('This is a test route.');
});


module.exports = router;
