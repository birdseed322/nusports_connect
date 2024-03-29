import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { getAllSessions } from "../../GraphQLQueries/queries";
import "./filterStyles.css";
import { sports } from "../SportsList/SportsList";

//Filter bar component found in events home page
function FilterBar({ setFilterSessions }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endDisabled, setendDisabled] = useState(true);
  const [sport, setSport] = useState("");
  const [avail, setAvail] = useState(true);
  let filterSessions = [];

  //Function called when search button is pressed. Changes sessions to be displayed based on preferences.
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const sessions = await getAllSessions();
      filterSessions = sessions.data.data.sessions;

      if (sport !== "") {
        filterSessions = filterSessions.filter(
          (session) => session.sport === sport
        );
      }

      if (startDate !== "") {
        if (endDate === "") {
          filterSessions = filterSessions.filter((session) => {
            return session.date === startDate.toDateString();
          });
        } else {
          filterSessions = filterSessions.filter((session) => {
            return (
              startDate === endDate ||
              (startDate <= session.fullStartTime &&
                session.fullEndTime <=
                  new Date(endDate).setHours(23, 59, 59, 999))
            );
          });
        }
      }

      if (avail === true) {
        filterSessions = filterSessions.filter(
          (session) =>
            session.currentParticipants < session.maxParticipants &&
            session.currentParticipants !== 0
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
            <option value=""> All Sports </option>
            {sports.map((sport) => (
              <option value={sport}>{sport}</option>
            ))}
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
