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
import { sports } from "../SportsList/SportsList";

function CreateSessionBody() {
  const [sport, setSport] = useState("Badminton");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [maxParticipant, setMaxParticipant] = useState(2);
  const [minStar, setMinStar] = useState(2);

  async function handleSubmit(e) {
    e.preventDefault();
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
      window.location.href = "/sessions/" + sessionId.data.data.createSession;
    } catch (err) {
      console.log(err);
    }
  }
  //Ensure events created has 2 hour buffer
  const filterPassedTime = (time) => {
    let currentDate = new Date();
    currentDate = currentDate.setHours(currentDate.getHours() + 2);
    currentDate = new Date(currentDate);
    const selectedDate = new Date(time);
    return currentDate.getTime() < selectedDate.getTime();
  };
  //Ensure that start time is not before present moment
  if (startDate < new Date()) {
    let currentDate = new Date();
    currentDate.setMinutes(Math.ceil(currentDate.getMinutes() / 15) * 15);
    currentDate.setHours(currentDate.getHours() + 2);
    currentDate = new Date(currentDate);
    setStartDate(currentDate);
  }
  //Ensure end time is passed start time
  if (endDate <= startDate) {
    let updatedEndTime = new Date(startDate);
    updatedEndTime = updatedEndTime.setMinutes(
      updatedEndTime.getMinutes() + 15
    );
    setEndDate(updatedEndTime);
  }

  return (
    <div className="create-container">
      <div className="create-panel">
        <div className="create-header">
          <h1 className="create-title">Create your own session</h1>
        </div>

        <form className="create-form" onSubmit={handleSubmit}>
          <div className="create-item">
            <label htmlFor="sport">
              <img
                className="input-icon"
                src={sportIcon}
                alt=""
                data-tip="Select sport"
              />
            </label>
            <select
              className="create-input create-sport"
              name="sport"
              id="sport"
              value={sport}
              onChange={(e) => setSport(e.target.value)}
              placeholder="Sport"
              required
            >
              {sports.map((sport) => (
                <option value={sport}>{sport}</option>
              ))}
            </select>
          </div>

          <div className="create-item">
            <label htmlFor="location" data-tip="Enter location">
              <img className="input-icon loc" src={locationIcon} alt="" />
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
          <div className="create-warning">
            Please ensure that the location is available for use before
            creating!
          </div>
          <div className="create-item create-date">
            <label htmlFor="date">
              <img
                className="input-icon"
                src={date}
                alt=""
                data-tip="Select date"
              />
            </label>
            <DatePicker
              className="create-input"
              placeholderText="Date"
              selected={startDate}
              onChange={(date) => {
                setStartDate(date);
                setEndDate(date);
              }}
              minDate={new Date()}
              filterTime={filterPassedTime}
              dateFormat="dd/MM/yyyy"
              required
              onKeyDown={(e) => {
                e.preventDefault();
              }}
            ></DatePicker>
          </div>

          <div className="create-item create-date">
            <label htmlFor="date">
              <img
                className="input-icon"
                src={start}
                alt=""
                data-tip="Select start time"
              />
            </label>
            <DatePicker
              className="create-input"
              placeholderText="Start Time"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              minDate={startDate}
              maxDate={startDate}
              filterTime={filterPassedTime}
              dateFormat="HH:mm"
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              required
              onKeyDown={(e) => {
                e.preventDefault();
              }}
            ></DatePicker>
          </div>

          <div className="create-item create-date">
            <label htmlFor="date">
              <img
                className="input-icon"
                src={end}
                alt=""
                data-tip="Select end time"
              />
            </label>
            <DatePicker
              className="create-input"
              placeholderText="End Time"
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              minDate={startDate}
              maxDate={startDate}
              filterTime={filterPassedTime}
              dateFormat="HH:mm"
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              required
              onKeyDown={(e) => {
                e.preventDefault();
              }}
            ></DatePicker>
          </div>

          <div className="create-item">
            <label htmlFor="participant">
              <img
                className="input-icon"
                src={participant}
                alt=""
                data-tip="Select number of participants"
              />
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
            <label htmlFor="stars">
              <img
                className="input-icon"
                src={star}
                alt=""
                data-tip="Select minimum number of stars out of 5"
              />
            </label>

            <select
              className="create-input"
              id="stars"
              onChange={(e) => setMinStar(parseInt(e.target.value))}
              required
            >
              <option value="0"> 0 </option>
              <option value="1"> 1 </option>
              <option value="2" selected>
                2
              </option>
              <option value="3"> 3 </option>
              <option value="4"> 4 </option>
              <option value="5"> 5 </option>
            </select>
          </div>

          <div className="create-warning">
            Reminder that the stars represent a person's attitude not skill
            level!
          </div>
          <div className="create-item">
            <label htmlFor="description"></label>
            <textarea
              className="create-input create-description"
              id="description"
              placeholder="Write a Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
