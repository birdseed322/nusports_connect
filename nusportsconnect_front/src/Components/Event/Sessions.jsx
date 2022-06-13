import React from "react";
import Navbar from "../NavBar/Navbar";
import FilterBar from "./FilterBar";
import "./sessionStyles.css";
import { DateTime } from "luxon";
import EventPillHost from "../EventPill/EventPillHost";

function Sessions() {
  //dummy code for events
  const user = {
    name: "Samuel Tay",
    email: "someemail@gmail.com",
    rating: 4.6,
    creationDate: "20/02/22",
    sportingInterests: ["Tennis", "Ultimate Frisbee"],
  };

  const events = [
    {
      eventName: "Badminton",
      eventLocation: "UTSH2",
      eventDate: DateTime.local(2022, 2, 21).toLocaleString(),
      eventStart: "9am",
      eventEnd: "11am",
      eventMembers: ["Wesley Teo", "Ezekiel Ang", "Jeremiah Lim"],
      eventCurrentPax: 3,
      eventMaxPax: 4,
      eventHost: "Peter Tan",
    },
    {
      eventName: "Badminton",
      eventLocation: "UTSH2",
      eventDate: DateTime.local(2022, 2, 21).toLocaleString(),
      eventStart: "9am",
      eventEnd: "11am",
      eventMembers: ["Wesley Teo", "Ezekiel Ang", "Samuel Tay"],
      eventCurrentPax: 3,
      eventMaxPax: 4,
      eventHost: "Peter Tan",
    },
    {
      eventName: "Badminton",
      eventLocation: "UTSH2",
      eventDate: DateTime.local(2022, 2, 22).toLocaleString(),
      eventStart: "9am",
      eventEnd: "11am",
      eventMembers: ["Wesley Teo", "Ezekiel Ang", "Samuel Tay"],
      eventCurrentPax: 3,
      eventMaxPax: 4,
      eventHost: "Peter Tan",
    },
  ];
  // const host = user.name === events.eventHost;
  // const participant = events.eventMembers.includes(user.name);
  return (
    <div className="sessions-container">
      <Navbar />
      <FilterBar />
      <div className="session">
        {/* get array of events from database, filter earliest date (lowest month && lowest day?) then wrap it in a div with the date as the heading
        filter events with same date into a new array, then EventPillHost with their properties.

        Repeat with next date. (Or if database already filters by date then will be best) */}
        <h1 className="date-header">21st Feb 2022</h1>
        <EventPillHost
          // host={host}
          history={false}
          participant={user}
          event={events[0]}
        />
        <EventPillHost
          // host={host}
          history={false}
          participant={false}
          event={events[1]}
        />
        <h1 className="date-header">22nd Feb 2022</h1>
        <EventPillHost
          // host={host}
          history={false}
          participant={false}
          event={events[2]}
        />
      </div>
    </div>
  );
}

export default Sessions;
