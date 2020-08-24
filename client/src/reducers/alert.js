import {ADD_ALERT, REMOVE_ALERT} from '../actions/types';

const initalState = [];

export default function(state = initalState, action) {
    const {type, payload} = action;

    switch(type) {
        case ADD_ALERT:
            return [...state, payload];

        case REMOVE_ALERT:
            return [];

        default:
            return state;
    }
}