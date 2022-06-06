import React, { useState } from "react";
import SignInForm from "./SignInForm";
import AccountCreationForm from "./AccountCreationForm";
import PasswordResetForm from "./PasswordResetForm";

function Login() {

  const [view, setView] = useState("signIn");

  const handleClick = (viewState) => {
    setView(viewState);
  };

  return (
    // <React.Fragment>
    <div>
      {(() => {
        switch (view) {
          case "signIn":
            return <SignInForm handleClick={handleClick} />;
          case "signUp":
            return <AccountCreationForm handleClick={handleClick} />;
          case "pwReset":
            return <PasswordResetForm handleClick={handleClick} />;
          default:
            return null;
        }
      })()}
    </div>
  );
}

export default Login;
