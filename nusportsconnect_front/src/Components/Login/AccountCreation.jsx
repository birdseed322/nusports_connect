import "./accountCreationStyles.css";
import { addUser } from "../../GraphQLQueries/queries";
import { loginRoute } from "../../Routes/routes";
import React from "react";

function AccountCreationForm(props) {
  const [email, setEmail] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const status = addUser(username, password, email);
    if (status === 200) {
      window.location.href = loginRoute;
    } else {
      window.location.reload();
    }
  }

  function handleEmailChange(e) {
    const updatedEmail = e.target.value;
    setEmail(updatedEmail);
  }

  function handleUsernameChange(e) {
    const updatedUserName = e.target.value;
    setUsername(updatedUserName);
  }

  function handlePasswordChange(e) {
    const updatedPassword = e.target.value;
    setPassword(updatedPassword);
  }

  return (
    <div className="container">
      <div className="create-form-box">
        <form onSubmit={handleSubmit}>
          <div className="center">
            <h2 className="sign-header">Create account</h2>
            <input
              className="sign-input"
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
            <br />
            <input
              className="sign-input"
              type="text"
              placeholder="Username"
              name="username"
              value={username}
              onChange={handleUsernameChange}
              minLength={3}
              maxLength={15}
              required
            />
            <br />
            <input
              className="sign-input"
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="At least one number and one uppercase and lowercase letter, and at least 8 or more characters"
              required
            />
          </div>

          <div className="sign-e">
            <button className="sign-login-btn">Sign Up</button>
          </div>
        </form>

        <div className="center">
          <p className="sign-sign-in">
            Already have an account?{" "}
            <a href="/#" onClick={() => props.handleClick("signIn")}>
              Sign In
            </a>{" "}
          </p>
        </div>
      </div>
    </div>
  );
}

export default AccountCreationForm;