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
import NotAuthenticated from "../NotAuthenticated/NotAuthenticated";
import { Loading } from "../Loading/Loading";
import { setPageTitle } from "../../generalFunctions";

function Sessions(props) {
  const [data, setData] = React.useState([]);
  const [user, setUser] = React.useState({
    username: "",
    userSessions: [],
  });
  const socket = props.socket;
  const [filterSessions, setFilterSessions] = React.useState(["placeholder"]);

  React.useEffect(() => {
    //Post to backend to retrieve user info to establish relatinoship between user and displayed sessions (eg non-participant, participant or host)
    const fetchUser = async () => {
      const userRes = await getUserUsername();
      const userSessions = await getUserCurrentSessionsId(
        userRes.data.data.userUsername
      );

      if (
        userRes.data.data.userUsername !== null
      ) {
        setUser({
          username: userRes.data.data.userUsername,
          userSessions: userSessions.data.data.userProfileInfo.currentSessions,
        });
      }
    };

    fetchUser();
    setPageTitle("NUSportsConnect - All Events");

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

  if (user.username === "") {
    return <Loading />;
  } else if (user.username === null) {
    return <NotAuthenticated />;
  }

  //Create set of dates
  let uniqDatesSet = new Set();

  //Display sessions that have not passed
  data.forEach((session) => {
    const now = new Date();
    const sessionStart = new Date(parseInt(session.fullStartTime));
    if (now < sessionStart && session.currentParticipants !== 0) {
      uniqDatesSet.add(session.date);
    }
  });

  //Sort dates
  let uniqDates = Array.from(uniqDatesSet);
  uniqDates = uniqDates.sort((a, b) => {
    return new Date(a) - new Date(b);
  });

  if (filterSessions.length === 0) {
    return (
      <div className="sessions-container">
        <Navbar socket={socket} />
        <FilterBar setFilterSessions={setFilterSessions} />
        <h1 className="session">No Sessions Available</h1>
      </div>
    );
  }

  return (
    <div className="sessions-container">
      <Navbar socket={socket} />
      <FilterBar setFilterSessions={setFilterSessions} />
      <div className="session">
        {uniqDates.map((date) => {
          let toRender = [];
          const now = new Date();
          for (const session of data) {
            const sessionStart = new Date(parseInt(session.fullStartTime));
            if (
              now < sessionStart &&
              session.date === date &&
              session.currentParticipants !== 0
            ) {
              toRender.push(session);
            }
          }
          return (
            <div className="profile-date-grp">
              <h1 className="event-date">{date}</h1>
              {toRender.map((session) => {
                let participant = false;

                user.userSessions.forEach((x) =>
                  x.id === session.id ? (participant = true) : null
                );
                return (
                  <EventPillHost
                    socket={socket}
                    username={user.username}
                    history={false}
                    participant={participant}
                    host={user.username === session.host.username}
                    event={session}
                  />
                );
              })}
              {toRender.length === 0 ? <h1>No Sessions Available!</h1> : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Sessions;
