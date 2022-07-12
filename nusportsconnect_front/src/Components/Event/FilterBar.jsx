import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { getAllSessions } from "../../GraphQLQueries/queries";
import "./filterStyles.css";

function FilterBar({ setFilterSessions }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endDisabled, setendDisabled] = useState(true);
  const [sport, setSport] = useState("");
  const [avail, setAvail] = useState(true);
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
        if (endDate === "") {
          filterSessions = filterSessions.filter((session) => {
            return session.date === startDate.toDateString();
          });
        } else {
          filterSessions = filterSessions.filter((session) => {
            return (
              startDate <= session.fullStartTime &&
              session.fullStartTime <= endDate
            );
          });
        }
      }

      console.log(avail);
      if (avail === true) {
        filterSessions = filterSessions.filter(
          (session) => session.currentParticipants < session.maxParticipants
        );
      }
      console.log(filterSessions);
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
            <option value=""> All Sports </option>
            <option value="Badminton"> Badminton </option>
            <option value="Basketball"> Basketball </option>
            <option value="Ultimate Frisbee"> Ultimate Frisbee </option>
          </select>
        </div>

        <div className="filter-item">
          <label htmlFor="start-date"> Start Date:</label>
          <DatePicker
            className="filter-input"
            placeholderText="Start Date"
            selected={startDate}
            onChange={(date) => {
              setStartDate(date);
              setendDisabled(false);
            }}
            minDate={new Date()}
            dateFormat="dd/MM/yyyy"
          ></DatePicker>
        </div>

        <div className="filter-item">
          <label htmlFor="end-date"> End Date:</label>
          <DatePicker
            className="filter-input"
            placeholderText="End Date"
            selected={endDate}
            onChange={(date) => {
              setEndDate(date);
            }}
            minDate={startDate}
            dateFormat="dd/MM/yyyy"
            disabled={endDisabled}
          ></DatePicker>
        </div>

        <div className="filter-item filter-avail">
          <label htmlFor="avail">Available Events</label>
          <input
            type="checkbox"
            className="filter-input"
            id="avail"
            name="avail"
            defaultChecked
            onChange={(e) => setAvail(e.target.checked)}
          />
        </div>

        <button className="filter-button">Search</button>
      </form>
    </div>
  );
}

export default FilterBar;
