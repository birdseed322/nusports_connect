import React, { useState } from 'react'
import SignInForm from './SignInForm'
import AccountCreationForm from './AccountCreationForm'

function Login() {

    const [view, setView] = useState('signIn');

    const handleClick = (viewState) => {
        setView(viewState);
    }

    return (
        <React.Fragment>
            {(() => {
                switch (view) {
                    case 'signIn':
                        return <SignInForm handleClick={handleClick} />
                    case 'signUp':
                        return <AccountCreationForm handleClick={handleClick} />
                    default:
                        return null
                }       
            })()}  
        </React.Fragment>
    )
}

export default Login