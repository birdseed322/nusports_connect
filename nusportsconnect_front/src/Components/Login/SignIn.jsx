import "./signInStyles.css";
import React from "react";
import { loginUser } from "../../GraphQLQueries/queries";
import { getAccessToken, setAccessToken } from "../../accessToken";

function SignInForm(props) {

  const [username, setUsername] = React.useState("");
  const [password, setPassoword] = React.useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    let response = await loginUser(username, password);
    if (response.status === 200 && (response.data.data.login)){
      setAccessToken(response.data.data.login.accessToken)
      console.log(getAccessToken())
      window.location.href = "/profile"
    } else {
      console.log("Not okay. Render prompt here")
    }
  } 

  return (
    <div className="container">
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
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <br />
            <input
              className="sign-input"
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => setPassoword(e.target.value)}
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
            <button
              className="sign-login-btn"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>

        <div className="center">
          <p className="sign-sign-off">
            Don't have an account?
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
