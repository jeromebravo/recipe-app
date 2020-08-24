import {combineReducers} from 'redux';
import auth from './auth';
import alert from './alert';
import recipe from './recipe';

const rootReducer = combineReducers({
    auth,
    alert,
    recipe
});

export default rootReducer;