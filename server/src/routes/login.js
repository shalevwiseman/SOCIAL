const express = require('express');
const passport = require('passport');
const router = express.Router();


// Handle user login
router.post('/', passport.authenticate('local', {
    successRedirect: '/', // Redirect on successful login
    failureRedirect: '/',    // Redirect on failed login
    failureFlash: true,           // Enable flash messages for error handling
}));


router.get('/', (req, res) => {
    res.send('This is a test route.');
});


module.exports = router;
