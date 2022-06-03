import "./accountCreationStyles.css";
import React from "react";

function AccountCreationForm(props) {
  return (
    <div className="create-form-box">
      <form action="/#">
        <div className="center">
          <h2 className="sign-header">Create account</h2>
          <input
            className="sign-input"
            type="email"
            placeholder="Email"
            name="email"
            required
          />
          <br />
          <input
            className="sign-input"
            type="text"
            placeholder="Username"
            name="username"
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
  );
}

export default AccountCreationForm;
