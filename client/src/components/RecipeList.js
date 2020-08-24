import React from 'react';
import PropTypes from 'prop-types';
import RecipeItem from './RecipeItem';

const RecipeList = ({recipes}) => {
    return (
        <div className='recipe-list'>
            {recipes.map(recipe => <RecipeItem key={recipe._id} recipe={recipe} showAction={true} />)}
        </div>
    );
}

RecipeList.propTypes = {
    recipes: PropTypes.array.isRequired
}

export default RecipeList;