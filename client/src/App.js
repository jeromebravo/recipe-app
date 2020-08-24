import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';
import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import Alert from './components/Alert';
import Homepage from './components/Homepage';
import RecipeForm from './components/RecipeForm';
import Recipe from './components/Recipe';
import {logout, loadUser} from './actions/auth';
import setTokenHeader from './utils/setTokenHeader';
import './App.css';

if(localStorage.token) {
    setTokenHeader(localStorage.token);
    try {
        store.dispatch(loadUser());
    } catch(err) {
        store.dispatch(logout());
    }
}

const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <div>
                    <Navbar />
                    <Alert />
                    <div className='container'>
                        <Switch>
                            <Route exact path='/' component={Homepage} />
                            <Route exact path='/register' component={Register} />
                            <Route exact path='/login' component={Login} />
                            <Route exact path='/recipe/new' component={RecipeForm} />
                            <Route exact path='/recipe/:id' component={Recipe} />
                            <Route exact path='*' render={() => <h1>PAGE NOT FOUND</h1>} />
                        </Switch>
                    </div>
                </div>
            </Router>
        </Provider>
    );
}

export default App;