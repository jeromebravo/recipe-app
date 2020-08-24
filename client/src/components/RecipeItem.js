import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {deleteRecipe, likeRecipe} from '../actions/recipe';
import 'font-awesome/css/font-awesome.min.css';
import Comment from './Comment';

const RecipeItem = ({recipe, auth, deleteRecipe, likeRecipe, showAction}) => {
    return (
        <div className='recipe'>
            <div className='recipe-header'>
                <img className='profile-picture' src={recipe.user.profilePicture} alt={recipe.user.name} />
                <div>
                    <p className='name'>
                        <Link to='/'>{recipe.user.name}</Link>
                    </p>
                    <p className='date'>
                        <Moment format='MMMM, DD YYYY - h:mm a'>{recipe.date}</Moment>
                    </p>
                </div>
            </div>

            <div className='recipe-body'>
                <hr className='hr' />
                <img className='recipe-image' src={recipe.recipeImage} alt={recipe.name} />
                <h1>{recipe.name}</h1>
                <h4>Ingredients</h4>
                <p>{recipe.ingredients}</p>
                <h4>Procedures</h4>
                <p>{recipe.procedures}</p>
                <hr className='hr' />
            </div>
            {showAction ?
                <div className='recipe-action'>
                    <div>
                        <button className='like-btn' onClick={() => likeRecipe(recipe._id)}><i className='fa fa-heart'></i> {!!recipe.likes.length && <span>( {recipe.likes.length} )</span>}</button>
                        <Link to={`/recipe/${recipe._id}`} className='comment-btn'><i className='fa fa-comment'></i> {!!recipe.comments.length && <span>( {recipe.comments.length} )</span>}</Link>
                    </div>

                    <div>
                        {auth.user.id === recipe.user._id && <button className='delete-btn' onClick={() => deleteRecipe(recipe._id)}><i className='fa fa-trash'></i></button>}
                    </div>
                </div>
                : <Comment recipe={recipe} />
            }
        </div>
    );
}

RecipeItem.propTypes = {
    recipe: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    deleteRecipe: PropTypes.func.isRequired,
    likeRecipe: PropTypes.func.isRequired,
    showAction: PropTypes.bool,
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {deleteRecipe, likeRecipe})(RecipeItem);