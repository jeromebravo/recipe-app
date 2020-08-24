const express = require('express');
const auth = require('../middleware/auth');
const User = require('../models/User');
const router = express.Router();

// @route    GET /api/user
// @desc     get current user
// @access   private
router.get('/', auth, async (req, res) => {
    try {
        let user = await User.findById(req.user.id);
        user = {id: user.id, name: user.name, email: user.email, profilePicture: user.profilePicture};
        res.json({user});
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;