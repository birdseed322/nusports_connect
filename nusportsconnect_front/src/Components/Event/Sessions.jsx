import React, { useState } from "react";
import Navbar from "../NavBar/Navbar";
import FilterBar from "./FilterBar";
import "./sessionStyles.css";
import EventPillHost from "../EventPill/EventPillHost";
import { getAllSessions } from "../../GraphQLQueries/queries";

function Sessions() {
  //dummy code for user
  const user = {
    name: "Samuel Tay",
    email: "someemail@gmail.com",
    rating: 4.6,
    creationDate: "20/02/22",
    sportingInterests: ["Tennis", "Ultimate Frisbee"],
  };

  const [data, setData] = React.useState([]);
  const [filterSessions, setFilterSessions] = React.useState(["placeholder"]);

  React.useEffect(() => {
    if (filterSessions[0] === "placeholder") {
      const apiCall = async () => {
        const sessions = await getAllSessions();
        setData(sessions.data.data.sessions);
      };
      apiCall();
    } else if (filterSessions.length === 0) {
      setData([]);
    } else {
      setData(filterSessions);
    }
  }, [filterSessions]);

  let uniqDatesSet = new Set();
  data.forEach((session) => {
    uniqDatesSet.add(session.date);
  });
  let uniqDates = Array.from(uniqDatesSet);
  uniqDates = uniqDates.sort((a, b) => {
    return new Date(a) - new Date(b);
  });

  if (filterSessions.length === 0) {
    return (
      <div className="sessions-container">
        <Navbar />
        <FilterBar setFilterSessions={setFilterSessions} />
        <h1 className="session">No Sessions Available</h1>
      </div>
    );
  }
  return (
    <div className="sessions-container">
      <Navbar />
      <FilterBar setFilterSessions={setFilterSessions} />
      <div className="session">
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
      </div>
    </div>
  );
}

export default Sessions;
