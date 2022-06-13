import React from "react";
import Navbar from "../NavBar/Navbar";
import FilterBar from "./FilterBar";
import "./sessionStyles.css";

function Sessions() {
  return (
    <div className="sessions-container">
      <Navbar />
      <FilterBar />
      <div>I am the Events Page</div>
    </div>
  );
}

export default Sessions;
