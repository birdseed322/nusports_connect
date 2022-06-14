import React from "react";
import "./createBodyStyles.css";

function CreateSessionBody() {
  return (
    <div className="create-container">
      <div className="create-panel">
        <div className="create-header">
          <h1 className="create-title">Create your own session</h1>
          <div className="create-warning">
            Note: Please ensure that the location is available for use before
            creating!
          </div>
        </div>

        <div className="create-body">
          <form action="#">
            <label htmlFor="sport">
              <img src="../../pics/sport-icon.png" alt="" />
            </label>
            <input type="text" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateSessionBody;
