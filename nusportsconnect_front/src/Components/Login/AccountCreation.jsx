import "./accountCreationStyles.css";
import { addUser, loginUser } from "../../GraphQLQueries/queries";
import { reqOriginRoute } from "../../Routes/routes";
import React from "react";
import Alert from "../Alert/Alert";
import ReactTooltip from "react-tooltip";
import { setAccessToken } from "../../accessToken";
import jwt_decode from "jwt-decode";

function AccountCreationForm(props) {
  const [email, setEmail] = React.useState("");
  const [fName, setFName] = React.useState("");
  const [lName, setLName] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [alert, setAlert] = React.useState(false);
  const socket = props.socket

  function handleCloseAlert() {
    setAlert(false);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (password === confirmPassword) {
      addUser(username, password, email, fName, lName).then(async (res) => {
          let response = await loginUser(username, password);
          const jwt = response.data.data.login.accessToken;
          setAccessToken(jwt);
          const aUsername = jwt_decode(jwt).username;
          socket.emit("login", aUsername);
          window.location.href = reqOriginRoute + "sessions"; 
      });
    } else {
      setAlert(true);
    }
  }

  function handleEmailChange(e) {
    const updatedEmail = e.target.value;
    setEmail(updatedEmail);
  }

  function handleFNameChange(e) {
    const updatedFName = e.target.value;
    setFName(updatedFName);
  }

  function handleLNameChange(e) {
    const updatedLName = e.target.value;
    setLName(updatedLName);
  }

  function handleUsernameChange(e) {
    const updatedUserName = e.target.value;
    setUsername(updatedUserName.toLowerCase());
  }

  function handlePasswordChange(e) {
    const password = e.target.value;
    setPassword(password);
  }
  function handleConfirmPasswordChange(e) {
    const confirmPassword = e.target.value;
    setConfirmPassword(confirmPassword);
  }

  return (
    <div className="container">
      {alert ? (
        <Alert
          message="Passwords do not match"
          handleCloseAlert={handleCloseAlert}
        />
      ) : null}
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
            <div className="name-inputs">
              <input
                className="name-input"
                type="text"
                placeholder="First Name"
                name="fName"
                value={fName}
                onChange={handleFNameChange}
                required
              />
              <input
                className="name-input"
                type="text"
                placeholder="Last Name"
                name="lName"
                value={lName}
                onChange={handleLNameChange}
                required
              />
            </div>
            <input
              className="sign-input username"
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
              data-tip="Ensure that your password has at least one number and one uppercase letter, with at least 8 or more characters"
              required
            />
            <ReactTooltip place="right" type="dark" effect="solid" />

            <input
              className="sign-input"
              type="password"
              placeholder="Confirm password"
              name="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="At least one number and one uppercase and lowercase letter, and at least 8 or more characters"
              required
            />
          </div>

          <div className="sign-e">
            <button className="sign-up-btn">Sign Up</button>
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
