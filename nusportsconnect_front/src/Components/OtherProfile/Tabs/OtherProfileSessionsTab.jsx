import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  getUserCurrentSessions,
  getUserIdentity,
  getUserUsername,
} from "../../../GraphQLQueries/queries";
import EventPillHost from "../../EventPill/EventPillHost";

function OtherProfileSessionsTab(props) {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [personalInfo, setPersonalInfo] = useState({
    id: "",
    username: "",
  });
  const [noSessions, setNoSessions] = useState(false);

  const socket = props.socket;
  React.useEffect(() => {
    const apiCall = async () => {
      let sessions = await getUserCurrentSessions(id);
      const pId = await getUserIdentity();
      const pUsername = await getUserUsername();
      sessions = sessions.data.data.getUserCurrentSessions;
      const upcomingSessions = sessions.filter((session) => {
        return new Date() < new Date(parseInt(session.fullEndTime));
      });
      if (upcomingSessions.length === 0) {
        setNoSessions(true);
      } else {
        setNoSessions(false);
        setData(upcomingSessions);
      }
      setPersonalInfo({
        id: pId.data.data.userIdentity,
        username: pUsername.data.data.userUsername,
      });
    };

    apiCall();
  }, [id]);
  console.log(data);
  let uniqDatesSet = new Set();
  data.forEach((session) => {
    uniqDatesSet.add(session.date);
  });
  let uniqDates = Array.from(uniqDatesSet);
  uniqDates = uniqDates.sort((a, b) => {
    return new Date(a) - new Date(b);
  });

  return (
    <div className="profile-tab-info">
      {uniqDates.map((date) => {
        let toRender = [];
        const now = new Date();
        for (const session of data) {
          const endTime = new Date(parseInt(session.fullEndTime));
          if (now < endTime && session.date === date) {
            toRender.push(session);
          }
        }
        return (
          <div className="profile-date-grp">
            <h1 className="profile-date-header">{date}</h1>
            {toRender.map((session) => {
              const host = personalInfo.username === session.host.username;
              const participant = session.participantsId.includes(
                personalInfo.id
              );
              return (
                <EventPillHost
                  history={false}
                  host={host}
                  participant={participant}
                  event={session}
                  username={personalInfo.username}
                  socket={socket}
                />
              );
            })}
          </div>
        );
      })}
      {noSessions ? <h1 className="not-found">No Upcoming Sessions!</h1> : null}
    </div>
  );
}

export default OtherProfileSessionsTab;
