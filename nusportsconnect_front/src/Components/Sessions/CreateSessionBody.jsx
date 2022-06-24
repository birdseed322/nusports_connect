import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./createBodyStyles.css";
import sportIcon from "../../pics/sport-icon.png";
import locationIcon from "../../pics/location-dot-solid.png";
import participant from "../../pics/person.png";
import star from "../../pics/star.png";
import date from "../../pics/frame.png";
import start from "../../pics/start.png";
import end from "../../pics/end.png";
import {
  createSession,
  getUserIdentity,
  joinSession,
} from "../../GraphQLQueries/queries";

function CreateSessionBody() {
  const [sport, setSport] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [maxParticipant, setMaxParticipant] = useState(2);
  const [minStar, setMinStar] = useState(0);

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(sport);
    console.log(location);
    console.log(description);
    console.log(startDate);
    console.log(endDate);
    console.log(maxParticipant);
    console.log(minStar);
    try {
      const hostId = await getUserIdentity();
      const sessionId = await createSession(
        sport,
        location,
        description,
        startDate,
        endDate,
        maxParticipant,
        minStar,
        hostId.data.data.userIdentity
      );
      await joinSession(
        hostId.data.data.userIdentity,
        sessionId.data.data.createSession
      );
    } catch (err) {
      console.log(err);
    }
  }

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

        <form className="create-form" onSubmit={handleSubmit}>
          <div className="create-item">
            <label htmlFor="sport">
              <img className="input-icon" src={sportIcon} alt="" />
            </label>
            <select
              className="create-input create-sport"
              name="#"
              id="sport"
              value={sport}
              onChange={(e) => setSport(e.target.value)}
              placeholder="Sport"
              required
            >
              {/* <option value="sport">Select Sport</option> */}
              <option value="badminton"> Badminton </option>
              <option value="basketball"> Basketball </option>
              <option value="ultimate"> Ultimate Frisbee </option>
            </select>
          </div>

          <div className="create-item">
            <label htmlFor="location">
              <img className="input-icon" src={locationIcon} alt="" />
            </label>
            <input
              className="create-input"
              type="text"
              placeholder="Location"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>

          <div className="create-item create-date">
            <label htmlFor="date">
              <img className="input-icon" src={date} alt="" />
            </label>
            <DatePicker
              className="create-input"
              placeholderText="Date"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              minDate={new Date()}
              dateFormat="dd/MM/yyyy"
              required
            ></DatePicker>
          </div>

          <div className="create-item create-date">
            <label htmlFor="date">
              <img className="input-icon" src={start} alt="" />
            </label>
            <DatePicker
              className="create-input"
              placeholderText="Start Time"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              minDate={startDate}
              maxDate={startDate}
              dateFormat="HH:mm"
              showTimeSelect
              timeIntervals={15}
              required
            ></DatePicker>
          </div>

          <div className="create-item create-date">
            <label htmlFor="date">
              <img className="input-icon" src={end} alt="" />
            </label>
            <DatePicker
              className="create-input"
              placeholderText="End Time"
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              minDate={startDate}
              maxDate={startDate}
              dateFormat="HH:mm"
              showTimeSelect
              timeIntervals={15}
              required
            ></DatePicker>
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
              value={maxParticipant}
              onChange={(e) => setMaxParticipant(e.target.value)}
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
              value={minStar}
              onChange={(e) => setMinStar(e.target.value)}
              required
            />
          </div>

          <div className="create-item">
            <label htmlFor="description"></label>
            <textarea
              className="create-input create-description"
              id="description"
              placeholder="Write a Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              cols="20"
              rows="10"
              required
            ></textarea>
          </div>

          <button className="create-button" type="submit">
            create
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateSessionBody;
