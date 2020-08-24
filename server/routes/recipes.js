const express = require('express');
const auth = require('../middleware/auth');
const User = require('../models/User');
const Recipe = require('../models/Recipe');
const {check, validationResult} = require('express-validator');
const router = express.Router();

// @route   POST /api/recipes
// @desc    create new recipe
// @access  private
router.post('/', [auth, [
    check('recipeImage', 'Recipe image is required').not().isEmpty(),
    check('name', 'Name is required').not().isEmpty(),
    check('ingredients', 'Ingredients is required').not().isEmpty(),
    check('procedures', 'Procedures is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);

    // check if there are errors
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    // deconstruct req.body
    const {recipeImage, name, ingredients, procedures} = req.body;

    try {
        // create newRecipe object
        let newRecipe = {user: req.user.id, recipeImage, name, ingredients, procedures};

        // save recipe in database
        newRecipe = await Recipe.create(newRecipe);

        res.json({newRecipe});
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   GET /api/recipes
// @desc    get all recipes
// @access  private
router.get('/', auth, async (req, res) => {
    try {
        // get all recipes
        const recipes = await Recipe.find().sort('-date').populate('user', ['name', 'profilePicture']);
        res.json({recipes});
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   GET /api/recipes/:id
// @desc    get recipe by id
// @access  private
router.get('/:id', auth, async (req, res) => {
    try {
        // get recipe
        const recipe = await Recipe.findById(req.params.id).populate('user', ['name', 'profilePicture']).populate('comments.user', ['name', 'profilePicture'])

        // check if recipe does not exist
        if(!recipe) {
            return res.status(404).json({msg: 'Recipe not found'});
        }

        res.json({recipe});
    } catch(err) {
        console.error(err.message);

        // check if ObjectId is invalid
        if(err.kind === 'ObjectId') {
            return res.status(404).json({msg: 'Recipe not found'});
        }

        res.status(500).send('Server error');
    }
});

// @route   DELETE /api/recipes/:id
// @desc    delete a recipe
// @access  private
router.delete('/:id', auth, async (req, res) => {
    // @todo - delete likes and comments
    try {
        // get recipe
        const recipe = await Recipe.findById(req.params.id);

        // check if recipe does not exist
        if(!recipe) {
            return res.status(404).json({msg: 'Recipe not found'});
        }

        // check if incorrect user
        if(recipe.user.toString() !== req.user.id) {
            return res.status(400).json({msg: 'Unauthorized user'})
        }

        // remove recipe
        await recipe.remove();

        res.json({msg: 'Recipe removed'});
    } catch(err) {
        console.error(err.message);

        // check if ObjectId is invalid
        if(err.kind === 'ObjectId') {
            return res.status(404).json({msg: 'Recipe not found'});
        }

        res.status(500).send('Server error');
    }
});

// @route   PUT /api/recipes/:id/like
// @desc    like or unlike a recipe
// @access  private
router.put('/:id/like', auth, async (req, res) => {
    try {
        // get recipe
        const recipe = await Recipe.findById(req.params.id);

        // check if recipe does not exist
        if(!recipe) {
            return res.status(404).json({msg: 'Recipe not found'});
        }

        // check if user already liked the recipe
        const liked = recipe.likes.filter(like => like.user.toString() === req.user.id).length > 0;

        // unlike the recipe
        if(liked) {
            // get the correct index
            const removeIndex = recipe.likes.map(like => like.user.toString()).indexOf(req.user.id);

            // remove like
            recipe.likes.splice(removeIndex, 1);

            // save recipe
            await recipe.save();

            return res.json({likes: recipe.likes});
        }

        // like the recipe
        recipe.likes.unshift({user: req.user.id});

        // save recipe
        await recipe.save();

        res.json({likes: recipe.likes});
    } catch(err) {
        console.error(err.message);

        // check if ObjectId is invalid
        if(err.kind === 'ObjectId') {
            return res.status(404).json({msg: 'Recipe not found'});
        }

        res.status(500).send('Server error');
    }
});

// @route   PUT /api/recipes/:id/comment
// @desc    add a comment
// @access  private
router.put('/:id/comment', [auth, [
    check('text', 'Text is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);

    // check if there are errors
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    // deconstruct req.body
    const {text} = req.body;

    try {
        // get recipe
        const recipe = await Recipe.findById(req.params.id).populate('comments.user', ['name', 'profilePicture']);

        // find user
        const user = await User.findById(req.user.id).select('_id name profilePicture');

        // check if recipe does not exist
        if(!recipe) {
            return res.status(404).json({errors: [{msg: 'Recipe not found'}]});
        }

        // add comment
        recipe.comments.unshift({user, text});

        // save recipe
        await recipe.save();

        res.json({comments: recipe.comments});
    } catch(err) {
        console.error(err.message);

        // check if ObjectId is invalid
        if(err.kind === 'ObjectId') {
            return res.status(404).json({msg: 'Recipe not found'});
        }

        res.status(500).send('Server error');
    }
});

// @route   DELETE /api/recipes/:id/comment/:comment_id
// @desc    delete a comment
// @access  private
router.delete('/:id/comment/:comment_id', auth, async (req, res) => {
    try {
        // get recipe
        const recipe = await Recipe.findById(req.params.id).populate('comments.user', ['name', 'profilePicture']);

        // check if recipe does not exist
        if(!recipe) {
            return res.status(404).json({msg: 'Recipe not found'});
        }

        // get correct index
        const removeIndex = recipe.comments.map(comment => comment.id.toString()).indexOf(req.params.comment_id);

        // check if comment does not exist
        if(removeIndex === -1) {
            return res.status(404).json({msg: 'Comment not found'});
        }

        // get the author of that comment
        const author = recipe.comments[removeIndex].user._id.toString();

        // check if incorrect user
        if(author !== req.user.id) {
            return res.status(400).json({msg: 'Unauthorized user'});
        }

        // remove comment
        recipe.comments.splice(removeIndex, 1);

        // save recipe
        await recipe.save();

        res.json({comments: recipe.comments});
    } catch(err) {
        console.error(err.message);

        // check if ObjectId is invalid
        if(err.kind === 'ObjectId') {
            return res.status(404).json({msg: 'Recipe not found'});
        }

        res.status(500).send('Server error');
    }
});

module.exports = router;