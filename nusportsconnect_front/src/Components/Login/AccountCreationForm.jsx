import './accountCreationStyles.css'
import React from 'react'

function AccountCreationForm(props) {
    return (
        <div className='create-form-box'>
            <div className='center'>
                <h2 className='sign-header'>Create account</h2>
                <input className='sign-input' type='email' placeholder='Email'/>
                <br/>
                <input className='sign-input' type='text' placeholder='Username'/>
                <br/>
                <input className='sign-input' type='password' placeholder='Password'/>
            </div>

            <div className='sign-e'>
                <button className='sign-login-btn'>Sign Up</button>
            </div>

            <div className='center'>
                <p className='sign-sign-in'>Already have an account? <a href='/#' onClick={() => props.handleClick("signIn")}>Sign In</a> </p>
            </div>

        </div>
    )
}


export default AccountCreationForm