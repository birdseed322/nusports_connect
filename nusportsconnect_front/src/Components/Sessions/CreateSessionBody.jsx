import React from "react";
import "./createBodyStyles.css";
import sport from "../../pics/sport-icon.png";
import location from "../../pics/location-dot-solid.png";
import participant from "../../pics/person.png";
import star from "../../pics/star.png";
import frame from "../../pics/frame.png";
import clock from "../../pics/clock-solid.png";
import time from "../../pics/time.png";

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

        <form action="#" className="create-form">
          <div className="create-item">
            <label htmlFor="sport">
              <img className="input-icon" src={sport} alt="" />
            </label>
            <select
              className="create-input create-sport"
              name="#"
              id="sport"
              placeholder="Sport"
              required
            >
              <option value="sport">Select Sport</option>
              <option value="badminton"> Badminton </option>
              <option value="basketball"> Basketball </option>
              <option value="ultimate"> Ultimate Frisbee </option>
            </select>
          </div>

          <div className="create-item">
            <label htmlFor="location">
              <img className="input-icon" src={location} alt="" />
            </label>
            <input
              className="create-input"
              type="text"
              placeholder="Location"
              id="location"
              required
            />
          </div>

          <div className="create-item">
            <label htmlFor="date">
              <img className="input-icon" src={frame} alt="" />
            </label>
            <input className="create-input" type="date" id="date" required />
          </div>

          <div className="create-item">
            <label htmlFor="start">
              <img className="input-icon" src={clock} alt="" />
            </label>
            <input className="create-input" type="time" id="start" required />
          </div>

          <div className="create-item">
            <label htmlFor="time">
              <img className="input-icon" src={time} alt="" />
            </label>
            <input className="create-input" type="time" id="time" required />
          </div>

          <div className="create-item">
            <label htmlFor="participant">
              <img className="input-icon" src={participant} alt="" />
            </label>
            <input
              className="create-input"
              type="number"
              placeholder="No. Participants"
              id="participant"
              min="2"
              max="30"
              required
            />
          </div>

          <div className="create-item">
            {" "}
            <label htmlFor="stars">
              <img className="input-icon" src={star} alt="" />
            </label>
            <input
              className="create-input"
              type="number"
              placeholder="Min.stars"
              id="stars"
              min="0"
              max="5"
              required
            />
          </div>

          <div className="create-item">
            <label htmlFor="description"></label>
            <input
              className="create-input create-description"
              type="text"
              placeholder="Write a Description"
              id="description"
              required
            />
          </div>

          <button className="create-button">create</button>
        </form>
      </div>
    </div>
  );
}

export default CreateSessionBody;
