import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { getUserCurrentSessions } from "../../../GraphQLQueries/queries";
import EventPillHost from "../../EventPill/EventPillHost";

function ProfileSessionsTab(props) {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [noSessions, setNoSessions] = useState(false);
  const socket = props.socket;
  React.useEffect(() => {
    const apiCall = async () => {
      let sessions = await getUserCurrentSessions(id);
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
    };

    apiCall();
  }, [id]);

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
            <h1 className="profile-date-header event-date">{date}</h1>
            {toRender.map((session) => {
              const host = id === session.host.username;
              return (
                <EventPillHost
                  history={false}
                  host={host}
                  participant={true}
                  event={session}
                  username={id}
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

export default ProfileSessionsTab;
