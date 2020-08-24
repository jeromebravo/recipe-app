import React from 'react';
import {Link} from 'react-router-dom';

const LandingPage = () => (
    <div className='landing-page'>
        <h1 className='landing-page-header'>DISCOVER NEW RECIPES</h1>
        <div className='landing-page-links'>
            <Link to='/register'><p className='link'>REGISTER</p></Link>
            <Link to='/login'><p className='link'>LOGIN</p></Link>
        </div>
    </div>
);

export default LandingPage