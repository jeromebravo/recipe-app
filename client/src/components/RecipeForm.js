import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Redirect, withRouter} from 'react-router-dom';
import {removeAlert} from '../actions/alert';
import {createRecipe} from '../actions/recipe';
import PropTypes from 'prop-types';

const RecipeForm = ({isAuthenticated, removeAlert, createRecipe, history}) => {
    const [formData, setFormData] = useState({
        recipeImage: '',
        name: '',
        ingredients: '',
        procedures: ''
    });

    const {recipeImage, name, ingredients, procedures} = formData;

    const onChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const onSubmit = e => {
        e.preventDefault();
        createRecipe(formData, history);
    }

    if(!isAuthenticated) {
        return <Redirect to='/login' />
    }

    return (
        <form className='form' onSubmit={onSubmit}>
            <h1 className='form-title'>NEW RECIPE</h1>
            <input className='form-input' type='text' name='recipeImage' value={recipeImage} onChange={onChange} placeholder='Recipe Image URL' required />
            <input className='form-input' type='text' name='name' value={name} onChange={onChange} placeholder='Dish Name' required />
            <textarea className='form-area' name='ingredients' defaultValue={ingredients} onChange={onChange} placeholder='Ingredients' required></textarea>
            <textarea className='form-area' name='procedures' defaultValue={procedures} onChange={onChange} placeholder='Procedures' required></textarea>
            <button className='form-submit' type='submit' onClick={removeAlert}>SUBMIT</button>
        </form>
    );
}

RecipeForm.propTypes = {
    isAuthenticated: PropTypes.bool,
    removeAlert: PropTypes.func.isRequired,
    createRecipe: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {removeAlert, createRecipe})(withRouter(RecipeForm));