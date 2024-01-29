const express = require('express');
const passport = require('passport');
const router = express.Router();


// Handle user login
router.post('/', passport.authenticate('local', {
    successRedirect: '/', // Redirect on successful login
    failureRedirect: '/api/signin',    // Redirect on failed login
    failureFlash: true,           // Enable flash messages for error handling
}));


// Handle user logout
router.get('/', (req, res) => {
    // Check for flash messages
    const errorMessages = req.flash('error');
    
    // Send the error messages as JSON
    res.json({ errors: errorMessages });
  });

module.exports = router;
