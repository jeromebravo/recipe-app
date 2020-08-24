import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {register} from '../actions/auth';
import PropTypes from 'prop-types';
import {removeAlert} from '../actions/alert';

const Register = ({register, removeAlert, isAuthenticated}) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        profilePicture: ''
    });

    const {name, email, password, profilePicture} = formData;

    const onChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const onSubmit = e => {
        e.preventDefault();
        register(name, email, password, profilePicture);
    }

    if(isAuthenticated) {
        return <Redirect to='/' />
    }

    return (
        <form className='form' onSubmit={onSubmit}>
            <h1 className='form-title'>REGISTER</h1>
            <input className='form-input' type='text' name='name' value={name} onChange={onChange} placeholder='Name' required />
            <input className='form-input' type='email' name='email' value={email} onChange={onChange} placeholder='Email' required />
            <input className='form-input' type='password' name='password' value={password} onChange={onChange} placeholder='Password' required />
            <input className='form-input' type='text' name='profilePicture' value={profilePicture} onChange={onChange} placeholder='Profile Image URL' required />
            <button className='form-submit' type='submit' onClick={removeAlert}>REGISTER</button>
        </form>
    );
}

Register.propTypes = {
    register: PropTypes.func.isRequired,
    removeAlert: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {register, removeAlert})(Register);