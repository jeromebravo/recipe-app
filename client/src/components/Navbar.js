import React, {Fragment} from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from '../actions/auth';
import 'font-awesome/css/font-awesome.min.css';

const Navbar = ({isAuthenticated, logout}) => {
    return (
        <nav>
            <div>
                <h1>
                    <Link className='navbar-header' to='/'>
                        DISH
                    </Link>
                </h1>
            </div>

            {!isAuthenticated ? (
                <Fragment>
                <ul className='navbar-right'>
                    <li>
                        <Link className='navbar-link' to='/register'>
                            <i className='fa fa-user-plus'></i> {' '}
                            Register
                        </Link>
                    </li>
                    <li>
                        <Link className='navbar-link' to='/login'>
                            <i className='fa fa-user'></i> {' '}
                            Login
                        </Link>
                    </li>
                </ul>
                </Fragment>
            ) : (
                <Fragment>
                <ul className='navbar-right'>
                    <li>
                        <Link className='navbar-link' to='/recipe/new'>
                            <i className='fa fa-plus'></i> {' '}
                            New Recipe
                        </Link>
                    </li>
                    <li>
                        <Link className='navbar-link' to='/' onClick={logout}>
                            <i className='fa fa-sign-out'></i> {' '}
                            Logout
                        </Link>
                    </li>
                </ul>
                </Fragment>
            )}

        </nav>
    );
}

Navbar.propTypes = {
    isAuthenticated: PropTypes.bool,
    logout: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {logout})(Navbar);