import React from "react";
import "./passwordResetStyles.css";

function PasswordResetForm(props) {
  return (
    <div className="container">
      <div className="create-form-box">
        <form action="/#">
          <div className="center">
            <h2 className="sign-header">Forgot password?</h2>
            <p> Enter your associated email</p>
            <input
              className="sign-input"
              type="email"
              placeholder="Email"
              name="email"
              required
            />
            <br />
          </div>

          <div className="sign-e">
            <button
              className="sign-login-btn"
              onClick={() => props.handleClick("signIn")}
            >
              Send Email
            </button>
          </div>
        </form>

        <div className="center">
          <a href="/#" onClick={() => props.handleClick("signIn")}>
            cancel
          </a>
        </div>
      </div>
    </div>
  );
}

export default PasswordResetForm;
