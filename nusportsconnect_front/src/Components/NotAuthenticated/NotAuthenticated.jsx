import React from "react";
import "./notAuthenticatedStyles.css";

function NotAuthenticated() {
  return (
    <div className="not-authenticated">
      <h1 className="error-header">User is not authenticated</h1>
      <p className="error-body">
        To login click{" "}
        <a href="/" className="error-redirect">
          here
        </a>
      </p>
    </div>
  );
}

export default NotAuthenticated;
