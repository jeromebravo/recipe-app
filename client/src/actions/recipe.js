import axios from 'axios';
import {addAlert} from './alert';
import {GET_RECIPES, DELETE_RECIPE, REMOVE_ALERT, UPDATE_LIKES, GET_RECIPE, ADD_COMMENT, DELETE_COMMENT} from './types';

// create new recipe
export const createRecipe = (formData, history) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    
    try {
        await axios.post('/api/recipes', formData, config);

        // redirect to home page
        history.push('/');

        // dispatch an alert
        dispatch(addAlert('Recipe created', 'success'));
    } catch(err) {
        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach(error => dispatch(addAlert(error.msg, 'danger')));
        }
    }
}

// get all recipes
export const getRecipes = () => async dispatch => {
    try {
        const res = await axios.get('/api/recipes');

        // dispatch GET_RECIPES
        dispatch({
            type: GET_RECIPES,
            payload: res.data.recipes
        });
    } catch(err) {
        console.error(err.message);
    }
}

// delete recipe
export const deleteRecipe = id => async dispatch => {
    try {
        await axios.delete(`/api/recipes/${id}`);

        // dispatch DELETE_RECIPE
        dispatch({
            type: DELETE_RECIPE,
            payload: id
        });

        // remove all alerts
        dispatch({
            type: REMOVE_ALERT
        });

        // add new alert
        dispatch(addAlert('Recipe deleted', 'success'));
    } catch(err) {
        console.error(err.message);
    }
}

// like recipe
export const likeRecipe = id => async dispatch => {
    try {
        const res = await axios.put(`/api/recipes/${id}/like`);

        dispatch({
            type: UPDATE_LIKES,
            payload: {id, likes: res.data.likes}
        });
    } catch(err) {
        console.error(err.message);
    }
}

// get recipe by id
export const getRecipeById = (id, history) => async dispatch => {
    try {
        const res = await axios.get(`/api/recipes/${id}`);
        dispatch({
            type: GET_RECIPE,
            payload: res.data.recipe
        });
    } catch(err) {
        history.push('/');
        dispatch(addAlert(err.response.data.msg, 'danger'));
    }
}

// add comment
export const addComment = (id, text) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({text});

    try {
        const res = await axios.put(`/api/recipes/${id}/comment`, body, config);

        dispatch({
            type: ADD_COMMENT,
            payload: {id, comments: res.data.comments}
        });
    } catch(err) {
        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach(error => dispatch(addAlert(error.msg, 'danger')));
        }
    }
}

// delete comment
export const deleteComment = (recipeId, commentId, history) => async dispatch => {
    try {
        await axios.delete(`/api/recipes/${recipeId}/comment/${commentId}`);

        dispatch({
            type: DELETE_COMMENT,
            payload: commentId
        });
    } catch(err) {
        history.push('/');
        dispatch(addAlert(err.response.data.msg, 'danger'));
    }
}