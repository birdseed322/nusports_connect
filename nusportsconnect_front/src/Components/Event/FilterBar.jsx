import React from "react";
import "./filterStyles.css";

function FilterBar() {
  return (
    <div className="filter-box">
      <form className="filter-form" action="#">
        <div className="filter-item">
          <label htmlFor="sport">Sport:</label>
          <select
            className="filter-input"
            name="#"
            id="sport"
            placeholder="Sport"
          >
            <option value="sport"> Select Sport </option>
            <option value="badminton"> Badminton </option>
            <option value="basketball"> Basketball </option>
            <option value="ultimate"> Ultimate Frisbee </option>
          </select>
        </div>

        <div className="filter-item">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            className="filter-input"
            id="date"
            placeholder="Select Date"
          />
        </div>

        <div className="filter-item">
          <label htmlFor="time">Start Time:</label>
          <input type="time" className="filter-input" id="time" step="300" />
        </div>

        <div className="filter-item">
          <label htmlFor="avail">Show events with availability</label>
          <input
            type="checkbox"
            className="filter-input"
            id="avail"
            name="avail"
          />
        </div>

        <button className="filter-button">Search</button>
      </form>
    </div>
  );
}

export default FilterBar;
