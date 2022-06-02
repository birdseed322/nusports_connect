import './signInStyles.css';
import React from 'react'

function SignInForm(props) {

    return (
        <div className='sign-form-box'>
            <div className='center'>
                <h2 className='sign-header-top'>Sign in to</h2>
                <h2 className='sign-header-bottom'>NUSports Connect</h2>
                <input className='sign-input' type='text' placeholder='Username'/>
                <br/>
                <input className='sign-input' type='password' placeholder='Password'/>
                <a href='/' className='sign-forgot-password'>Forgot password?</a>
            </div>
            <div className='sign-e'>
                <button className='sign-login-btn' type="submit">Login</button>
            </div>
            <div className='center'>
                <p className='sign-sign-off'>Don't have an account? <a href='/#' onClick={() => props.handleClick("signUp")}>Sign Up</a> </p>
            </div>
        </div>
    )
}


export default SignInForm