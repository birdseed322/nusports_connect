import React from "react";
import "./createBodyStyles.css";
import sport from "../../pics/sport-icon.png";
import location from "../../pics/location-dot-solid.png";
import participant from "../../pics/person.png";

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
          <form action="#" className="create-form">
            <div className="create-item">
              <label htmlFor="sport">
                <img src={sport} alt="" />
              </label>
              <select name="#" id="sport" placeholder="Sport">
                <option value="sport">Select Sport</option>
                <option value="badminton"> Badminton </option>
                <option value="basketball"> Basketball </option>
                <option value="ultimate"> Ultimate Frisbee </option>
              </select>
            </div>

            <div className="create-item">
              <label htmlFor="location">
                <img src={location} alt="" />
              </label>
              <input type="text" placeholder="Location" id="location" />
            </div>
            {/* date, starttime and location to use luxon */}
            <div className="create-item">
              <label htmlFor="participant">
                <img src={participant} alt="" />
              </label>
              <input
                type="number"
                placeholder="No. Participants"
                id="participant"
                min="2"
                max="30"
              />
            </div>
            <button>submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateSessionBody;
