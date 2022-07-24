import React, { useState } from "react";
import SignIn from "./SignIn";
import AccountCreation from "./AccountCreation";
import PasswordReset from "./PasswordReset";
import Sessions from "../Event/Sessions";

function Login(props) {
  const socket = props.socket
  const [view, setView] = useState("signIn");

  const handleClick = (viewState) => {
    setView(viewState);
  };

  return (
    <div>
      {(() => {
        switch (view) {
          case "signIn":
            return <SignIn handleClick={handleClick} socket={socket}/>;
          case "signUp":
            return <AccountCreation handleClick={handleClick} socket={socket}/>;
          case "pwReset":
            return <PasswordReset handleClick={handleClick} />;
          case "sessions":
            return <Sessions />;
          default:
            return null;
        }
      })()}
    </div>
  );
}

export default Login;
