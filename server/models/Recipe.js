const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    recipeImage: {type: String, required: true},
    name: {type: String, required: true},
    ingredients: {type: String, required: true},
    procedures: {type: String, required: true},
    likes: [
        {
            user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
        }
    ],
    comments: [
        {
            text: {type: String, required: true},
            user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
            date: {type: Date, default: Date.now}
        }
    ],
    date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Recipe', RecipeSchema);