import axios from 'axios';
import {SET_CURRENT_USER, CLEAR_RECIPES} from './types';
import setTokenHeader from '../utils/setTokenHeader';
import {addAlert} from './alert';

// set current user
export const setCurrentUser = user => dispatch => dispatch({
    type: SET_CURRENT_USER,
    payload: user
});

// load user
export const loadUser = () => async dispatch => {
    try {
        // get current user
        const res = await axios.get('/api/user');
        // set current user
        dispatch(setCurrentUser(res.data.user));
    } catch(err) {
        console.log('error');
        console.error(err.message);
        dispatch(logout());
    }
}

// register user
export const register = (name, email, password, profilePicture) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({name, email, password, profilePicture});

    try {
        const res = await axios.post('/api/auth/register', body, config);

        // deconstruct res.data
        const {user, token} = res.data;

        // set token in local storage
        localStorage.setItem('token', token);

        // set token in header
        setTokenHeader(token);

        // set current user
        dispatch(setCurrentUser(user));

    } catch(err) {
        const errors = err.response.data.errors;
        
        if(errors) {
            errors.forEach(error => dispatch(addAlert(error.msg, 'danger')));
        }
    }
}

// login user
export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({email, password});

    try {
        const res = await axios.post('/api/auth/login', body, config);

        // deconstruct res.data
        const {user, token} = res.data;

        // set token in local storage
        localStorage.setItem('token', token);

        // set token in header
        setTokenHeader(token);

        // set current user
        dispatch(setCurrentUser(user));
    } catch(err) {
        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach(error => dispatch(addAlert(error.msg, 'danger')));
        }
    }
}

// logout user
export const logout = () => dispatch => {
    // remove token in local storage
    localStorage.removeItem('token');
    // remove token header
    setTokenHeader(false);
    // set current user to empty object
    dispatch(setCurrentUser({}));
    // clear recipes
    dispatch({
        type: CLEAR_RECIPES
    });
}