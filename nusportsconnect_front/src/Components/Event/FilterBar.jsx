import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { getAllSessions } from "../../GraphQLQueries/queries";
import "./filterStyles.css";

function FilterBar({ setFilterSessions }) {
  const [startDate, setStartDate] = useState("");
  const [sport, setSport] = useState("");
  const [avail, setAvail] = useState(false);
  let filterSessions = [];

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const sessions = await getAllSessions();
      filterSessions = sessions.data.data.sessions;
      console.log(sport);
      if (sport !== "") {
        filterSessions = filterSessions.filter(
          (session) => session.sport === sport
        );
      }

      console.log(startDate);
      if (startDate !== "") {
        filterSessions = filterSessions.filter(
          (session) => session.date === startDate.toDateString()
        );
      }

      console.log(avail);
      if (avail === true) {
        filterSessions = filterSessions.filter(
          (session) => session.currentParticipants < session.maxParticipants
        );
      }
      setFilterSessions(filterSessions);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="filter-box">
      <form className="filter-form" onSubmit={handleSubmit}>
        <div className="filter-item">
          <label htmlFor="sport">Sport:</label>
          <select
            className="filter-input"
            id="sport"
            placeholder="Sport"
            onChange={(e) => setSport(e.target.value)}
          >
            <option value=""> Select Sport </option>
            <option value="Badminton"> Badminton </option>
            <option value="Basketball"> Basketball </option>
            <option value="Ultimate Frisbee"> Ultimate Frisbee </option>
          </select>
        </div>

        <div className="filter-item">
          <label htmlFor="date">Date:</label>
          <DatePicker
            className="filter-input"
            placeholderText="Date"
            selected={startDate}
            onChange={(date) => {
              setStartDate(date);
            }}
            minDate={new Date()}
            dateFormat="dd/MM/yyyy"
          ></DatePicker>
        </div>

        {/* <div className="filter-item">
          <label htmlFor="time">Start Time:</label>
          <DatePicker
            className="filter-input"
            placeholderText="Start Time"
            selected={startDate}
            onChange={(date) => setStartDate(date) && setFilterTime(date)}
            minDate={startDate}
            maxDate={startDate}
            dateFormat="HH:mm"
            showTimeSelect
            timeIntervals={15}
          ></DatePicker>
        </div> */}

        <div className="filter-item">
          <label htmlFor="avail">Show events with availability</label>
          <input
            type="checkbox"
            className="filter-input"
            id="avail"
            name="avail"
            onChange={(e) => setAvail(e.target.checked)}
          />
        </div>

        <button className="filter-button">Search</button>
      </form>
    </div>
  );
}

export default FilterBar;
