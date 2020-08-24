const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator');
const User = require('../models/User');
const router = express.Router();

// @route    POST /api/auth/register
// @desc     register user
// @access   public
router.post('/register', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please provide a valid email').isEmail(),
    check('password', 'Password must be at least 8 characters').isLength({min: 8}),
    check('profilePicture', 'Profile picture is required').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);

    // check if there are errors
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    // deconstruct req.body
    const {name, email, password, profilePicture} = req.body;

    try {
        let user = await User.findOne({email});

        // check if user exist
        if(user) {
            return res.status(400).json({errors: [{msg: 'User already exist'}]});
        }

        // create user object
        user = {name, email, password, profilePicture};

        // hash password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // save user in database
        user = await User.create(user);

        // return jsonwebtoken
        const payload = {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                profilePicture: user.profilePicture
            }
        };
        
        const token = jwt.sign(payload, config.get('jwtSecret'));

        res.json({user: payload.user, token});
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route    POST /api/auth/login
// @desc     authenticate user
// @access   public
router.post('/login', [
    check('email', 'Please provide a valid email').isEmail(),
    check('password', 'Password is required').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);

    // check if there are errors
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    // deconstruct req.body
    const {email, password} = req.body;

    try {
        let user = await User.findOne({email});

        // check if there is no user
        if(!user) {
            return res.status(400).json({errors: [{msg: 'Incorrect email or password'}]});
        }

        // check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);

        // if incorrect password
        if(!isMatch) {
            return res.status(400).json({errors: [{msg: 'Incorrect email or password'}]});
        }

        // return jsonwebtoken
        const payload = {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                profilePicture: user.profilePicture
            }
        };

        const token = jwt.sign(payload, config.get('jwtSecret'));

        res.json({user: payload.user, token});
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;