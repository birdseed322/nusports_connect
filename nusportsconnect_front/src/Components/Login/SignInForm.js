import React from 'react'

function SignInForm() {
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
                <button className='sign-login-btn'>Login</button>
            </div>
            <div className='center'>
                <p className='sign-sign-off'>Don't have an account? </p>
                <a href='/' className='sign-sign-up'>Sign Up</a>
            </div>
        </div>
    )
}


export default SignInForm