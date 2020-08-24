import {SET_CURRENT_USER} from '../actions/types';

const initialState = {
    isAuthenticated: false,
    loading: true,
    user: {}
}

export default function(state = initialState, action) {
    const {type, payload} = action;

    switch(type) {
        case SET_CURRENT_USER:
            return {
                isAuthenticated: !!Object.keys(payload).length,
                loading: false,
                user: payload
            }
        
        default:
            return state;
    }
}