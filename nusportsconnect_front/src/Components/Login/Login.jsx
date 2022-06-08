import React, { useState } from "react";
import SignIn from "./SignIn";
import AccountCreation from "./AccountCreation";
import PasswordReset from "./PasswordReset";
import NavDirectory from "../NavBar/NavDirectory";

function Login() {
  const [view, setView] = useState("signIn");

  const handleClick = (viewState) => {
    setView(viewState);
  };

  return (
    <div>
      {(() => {
        switch (view) {
          case "signIn":
            return <SignIn handleClick={handleClick} />;
          case "signUp":
            return <AccountCreation handleClick={handleClick} />;
          case "pwReset":
            return <PasswordReset handleClick={handleClick} />;
          case "session":
            return <NavDirectory />;
          default:
            return null;
        }
      })()}
    </div>
  );
}

export default Login;