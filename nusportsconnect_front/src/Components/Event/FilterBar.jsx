import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "./filterStyles.css";

function FilterBar() {
  const [startDate, setStartDate] = useState(null);
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

        <div className="filter-item">
          <label htmlFor="time">Start Time:</label>
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
