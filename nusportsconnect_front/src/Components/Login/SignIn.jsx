import "./signinstyles.css";
import React from "react";

function SignInForm(props) {
  return (
    <div className="container">
      <div className="sign-form-box">
        <form action="/#">
          <div className="center">
            <h2 className="sign-header-top">Sign in to</h2>
            <h2 className="sign-header-bottom">NUSports Connect</h2>
            <input
              className="sign-input"
              type="text"
              placeholder="Username"
              name="username"
              required
            />
            <br />
            <input
              className="sign-input"
              type="password"
              placeholder="Password"
              name="password"
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
              onClick={() => props.handleClick("sessions")}
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
