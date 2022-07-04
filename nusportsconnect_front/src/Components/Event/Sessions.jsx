import React from "react";
import Navbar from "../NavBar/Navbar";
import FilterBar from "./FilterBar";
import "./sessionStyles.css";
import EventPillHost from "../EventPill/EventPillHost";
import {
  getAllSessions,
  getUserCurrentSessionsId,
  getUserUsername,
} from "../../GraphQLQueries/queries";

function Sessions() {
  const [data, setData] = React.useState([]);
  const [user, setUser] = React.useState({
    username: "",
    userSessions: [],
  });

  const [filterSessions, setFilterSessions] = React.useState(["placeholder"]);
  React.useEffect(() => {
    const fetchUser = async () => {
      const userRes = await getUserUsername();
      const userSessions = await getUserCurrentSessionsId(
        userRes.data.data.userUsername
      );
      setUser({
        username: userRes.data.data.userUsername,
        userSessions: userSessions.data.data.userProfileInfo.currentSessions,
      });
    };
    fetchUser();

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
                let participant = false;

                user.userSessions.forEach((x) =>
                  x.id === session.id ? (participant = true) : null
                );

                return (
                  <EventPillHost
                    history={false}
                    participant={participant}
                    host={user.username === session.host.username}
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
