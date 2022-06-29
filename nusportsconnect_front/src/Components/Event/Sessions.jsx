import React, { useState } from "react";
import Navbar from "../NavBar/Navbar";
import FilterBar from "./FilterBar";
import "./sessionStyles.css";
import EventPillHost from "../EventPill/EventPillHost";
import { getAllSessions } from "../../GraphQLQueries/queries";

function Sessions() {
  //dummy code for events
  const user = {
    name: "Samuel Tay",
    email: "someemail@gmail.com",
    rating: 4.6,
    creationDate: "20/02/22",
    sportingInterests: ["Tennis", "Ultimate Frisbee"],
  };

  const [data, setData] = React.useState([]);
  const [filterSessions, setFilterSessions] = React.useState([]);
  console.log(filterSessions);
  // const events = [
  //   {
  //     eventName: "Badminton",
  //     eventLocation: "UTSH2",
  //     eventDate: DateTime.local(2022, 2, 21).toLocaleString(),
  //     eventStart: "9am",
  //     eventEnd: "11am",
  //     eventMembers: ["Wesley Teo", "Ezekiel Ang", "Peter Tan"],
  //     eventCurrentPax: 3,
  //     eventMaxPax: 8,
  //     eventHost: "Peter Tan",
  //   },
  //   {
  //     eventName: "Basketball",
  //     eventLocation: "PGPR Basketball court 2",
  //     eventDate: DateTime.local(2022, 2, 21).toLocaleString(),
  //     eventStart: "3.30pm",
  //     eventEnd: "5.30pm",
  //     eventMembers: [
  //       "Wesley Teo",
  //       "Ezekiel Ang",
  //       "Peter Tan",
  //       "Klay Thompson",
  //       "Steph Curry",
  //     ],
  //     eventCurrentPax: 5,
  //     eventMaxPax: 8,
  //     eventHost: "Peter Tan",
  //   },
  //   {
  //     eventName: "Badminton",
  //     eventLocation: "UTSH2",
  //     eventDate: DateTime.local(2022, 2, 22).toLocaleString(),
  //     eventStart: "9am",
  //     eventEnd: "11am",
  //     eventMembers: ["Wesley Teo", "Ezekiel Ang", "Samuel Tay"],
  //     eventCurrentPax: 3,
  //     eventMaxPax: 4,
  //     eventHost: "Peter Tan",
  //   },
  // ];

  React.useEffect(() => {
    if (filterSessions.length === 0) {
      const apiCall = async () => {
        const sessions = await getAllSessions();
        setData(sessions.data.data.sessions);
      };

      apiCall();
    } else {
      const apiCall = () => {
        setData(filterSessions);
      };

      apiCall();
    }
  });

  let uniqDatesSet = new Set();
  data.forEach((session) => {
    uniqDatesSet.add(session.date);
  });
  let uniqDates = Array.from(uniqDatesSet);
  uniqDates = uniqDates.sort((a, b) => {
    return new Date(a) - new Date(b);
  });

  // const host = user.name === events.eventHost;
  // const participant = events.eventMembers.includes(user.name);
  // must use the map function to check
  return (
    <div className="sessions-container">
      <Navbar />
      <FilterBar setFilterSessions={setFilterSessions} />
      <div className="session">
        {/* get array of events from database, filter earliest date (lowest month && lowest day?) then wrap it in a div with the date as the heading
        filter events with same date into a new array, then EventPillHost with their properties.

        Repeat with next date. (Or if database already filters by date then will be best) */}

        {uniqDates.map((date) => {
          let toRender = [];
          for (const session of data) {
            if (session.date === date) {
              toRender.push(session);
            }
          }
          return (
            <div>
              <h1>{date}</h1>
              {toRender.map((session) => {
                return (
                  <EventPillHost
                    history={false}
                    participant={user}
                    event={session}
                  />
                );
              })}
            </div>
          );
        })}

        {/* <h1 className="date-header">21st Feb 2022</h1>
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
        /> */}
      </div>
    </div>
  );
}

export default Sessions;
