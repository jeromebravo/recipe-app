import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {getRecipeById} from '../actions/recipe';
import PropTypes from 'prop-types';
import RecipeItem from './RecipeItem';

const Recipe = ({match, history, recipe: {loading, recipe}, getRecipeById}) => {
    useEffect(() => {
        getRecipeById(match.params.id, history);
    }, [getRecipeById, match.params.id, history]);

    return !loading && !!Object.keys(recipe).length && (
        <div className='recipe-list'>
            <RecipeItem recipe={recipe} showAction={false} />
        </div>
    )
}

Recipe.propTypes = {
    recipe: PropTypes.object.isRequired,
    getRecipeById: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    recipe: state.recipe
});

export default connect(mapStateToProps, {getRecipeById})(Recipe);