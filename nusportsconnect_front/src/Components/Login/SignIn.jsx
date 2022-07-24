import "./signInStyles.css";
import React from "react";
import { checkSessionEnded, checkUpcomingSessions, loginUser } from "../../GraphQLQueries/queries";
import { getAccessToken, setAccessToken } from "../../accessToken";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Alert from "../Alert/Alert";
import { reqOriginRoute } from "../../Routes/routes";

function SignInForm(props) {
  const socket = props.socket
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [alert, setAlert] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (getAccessToken() !== "") {
      window.location.href = reqOriginRoute + "/sessions"
    }
  }, [])

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      let response = await loginUser(username, password);
      console.log(response);
      if (response.status === 200 && response.data.data.login) {
        const jwt = response.data.data.login.accessToken;
        setAccessToken(jwt);
        const username = jwt_decode(jwt).username;
        socket.emit("login", username);
        checkUpcomingSessions(username);
        checkSessionEnded(username)
        navigate("/sessions");
      } else {
        setAlert(true);
      }
    } catch (err) {
      console.log(err);
    }
  }

  function handleCloseAlert() {
    setAlert(false);
  }

  return (
    <div className="container">
      {alert ? (
        <Alert
          message="Wrong username or password"
          handleCloseAlert={handleCloseAlert}
        />
      ) : null}
      <div className="sign-form-box">
        <form action="/#" onSubmit={handleSubmit}>
          <div className="center">
            <h2 className="sign-header-top">Sign in to</h2>
            <h2 className="sign-header-bottom">NUSports Connect</h2>
            <input
              className="sign-input"
              type="text"
              placeholder="Username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value.toLowerCase())}
              required
            />
            <br />
            <input
              className="sign-input"
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <a
              href="/#"
              className="sign-forgot-password"
              onClick={() => props.handleClick("pwReset")}
            >
              Forgot password?
            </a>
          </div>

          <div className="sign-e">
            <button className="sign-login-btn" type="submit">
              Login
            </button>
          </div>
        </form>

        <div className="center">
          <p className="sign-sign-off">
            Don't have an account? <br />
            <a href="/#" onClick={() => props.handleClick("signUp")}>
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignInForm;
