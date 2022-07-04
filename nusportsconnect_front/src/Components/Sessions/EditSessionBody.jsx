import React, { useState } from "react";
import {useParams} from 'react-router-dom'
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
    editSession,
  getSessionInfo
} from "../../GraphQLQueries/queries";

function EditSessionBody() {
  const {id} = useParams();  
  const [sport, setSport] = useState("Badminton");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [maxParticipant, setMaxParticipant] = useState(2);
  const [minStar, setMinStar] = useState(0);
  const [currentParticipants, setCurrentParticipants] = useState(0);

  React.useEffect(() => {
    const apiCall = async () => {
        let session = await getSessionInfo(id);
        session = session.data.data.getSessionInfo; 
        setSport(session.sport);
        setLocation(session.location);
        setDescription(session.description);
        setStartDate(new Date(parseInt(session.fullStartTime)));
        setEndDate(new Date(parseInt(session.fullEndTime)));
        setMaxParticipant(session.maxParticipants);
        setCurrentParticipants(session.currentParticipants);
        setMinStar(session.minStar);
      };

      apiCall();

  }, [id]);

  const filterPassedTime = (time) => {
    let currentDate = new Date();
    currentDate = currentDate.setHours(currentDate.getHours() + 2);
    currentDate = new Date(currentDate);
    const selectedDate = new Date(time);
    return currentDate.getTime() < selectedDate.getTime();
  };

  if (startDate < new Date()){
    let currentDate = new Date();
    currentDate = currentDate.setHours(currentDate.getHours() + 2);
    currentDate = new Date(currentDate);
    setStartDate(currentDate);
  }

  if (endDate < startDate){
    setEndDate(startDate);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
        editSession(id, location, description, startDate, endDate, maxParticipant, minStar);
        window.location.href="/sessions/" + id;
      
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="create-container">
      <div className="create-panel">
        <div className="create-header">
          <h1 className="create-title">Edit your session</h1>
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
              disabled
              className="create-input create-sport"
              name="#"
              id="sport"
              value={sport}
              onChange={(e) => setSport(e.target.value)}
              placeholder="Sport"
              required
            >
              <option value="Badminton"> Badminton </option>
              <option value="Basketball"> Basketball </option>
              <option value="Ultimate Frisbee">Ultimate Frisbee</option>
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
            onChange={(date) => {
              setStartDate(date);
              setEndDate(date);
            }}
            minDate={new Date()}
            filterTime={filterPassedTime}
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
              filterTime={filterPassedTime}
              dateFormat="HH:mm"
              showTimeSelect
              showTimeSelectOnly
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
              filterTime={filterPassedTime}
              dateFormat="HH:mm"
              showTimeSelect
              showTimeSelectOnly
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
              min={currentParticipants}
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

          <button className="change-button" type="submit">
            change
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditSessionBody;
