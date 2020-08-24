import {GET_RECIPES, CLEAR_RECIPES, DELETE_RECIPE, UPDATE_LIKES, GET_RECIPE, ADD_COMMENT, DELETE_COMMENT} from '../actions/types';

const initialState = {recipes: [], recipe: {}, loading: true};

export default function(state = initialState, action) {
    const {type, payload} = action;

    switch(type) {
        case GET_RECIPES:
            return {recipes: [...payload], recipe: {}, loading: false}

        case GET_RECIPE:
            return {...state, recipe: payload, loading: false};

        case ADD_COMMENT:
            return {
                ...state,
                loading: false,
                recipe: {...state.recipe, comments: payload.comments}
            }

        case DELETE_COMMENT:
            return {
                ...state,
                loading: false,
                recipe: {...state.recipe, comments: state.recipe.comments.filter(comment => comment._id !== payload)}
            }

        case UPDATE_LIKES:
            return {
                recipes: state.recipes.map(recipe => recipe._id === payload.id ? {...recipe, likes: payload.likes} : recipe),
                recipe: {},
                loading: false
            }

        case DELETE_RECIPE:
            return {
                recipes: state.recipes.filter(recipe => recipe._id !== payload),
                recipe: {},
                loading: false
            }

        case CLEAR_RECIPES:
            return {recipes: [], recipe: {}, loading: false};

        default:
            return state;
    }
}