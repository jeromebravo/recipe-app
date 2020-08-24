import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {removeAlert} from '../actions/alert';
import {getRecipes} from '../actions/recipe';
import PropTypes from 'prop-types';
import RecipeList from './RecipeList';
import LandingPage from './LandingPage';

const Homepage = ({history, removeAlert, isAuthenticated, getRecipes, recipe: {recipes}}) => {
    useEffect(() => {
        history.listen(() => {
            removeAlert();
        });

        getRecipes();
    }, [history, removeAlert, getRecipes]);

    return !isAuthenticated ? <LandingPage /> : <RecipeList recipes={recipes} />
}

Homepage.propTypes = {
    removeAlert: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    getRecipes: PropTypes.func.isRequired,
    recipe: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    recipe: state.recipe
});

export default connect(mapStateToProps, {removeAlert, getRecipes})(Homepage);