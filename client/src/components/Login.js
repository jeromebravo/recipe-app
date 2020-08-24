import React, {useState} from 'react';
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux';
import {login} from '../actions/auth';
import PropTypes from 'prop-types';
import {removeAlert} from '../actions/alert';

const Login = ({login, removeAlert, isAuthenticated}) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const {email, password} = formData;

    const onChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const onSubmit = e => {
        e.preventDefault();
        login(email, password);
    }

    if(isAuthenticated) {
        return <Redirect to='/' />
    }

    return (
        <form className='form' onSubmit={onSubmit}>
            <h1 className='form-title'>LOGIN</h1>
            <input className='form-input' type='email' name='email' value={email} onChange={onChange} placeholder='Email' required />
            <input className='form-input' type='password' name='password' value={password} onChange={onChange} placeholder='Password' required />
            <button className='form-submit' type='submit' onClick={removeAlert}>LOGIN</button>
        </form>
    );
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    removeAlert: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {login, removeAlert})(Login);