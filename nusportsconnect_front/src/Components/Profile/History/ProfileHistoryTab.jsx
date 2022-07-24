import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { getUserCurrentSessions } from "../../../GraphQLQueries/queries";
import EventPillHost from "../../EventPill/EventPillHost";

function ProfileHistoryTab(props) {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [noSessions, setNoSessions] = useState(false);

  React.useEffect(() => {
    const apiCall = async () => {
      const sessions = await getUserCurrentSessions(id);
      setData(sessions.data.data.getUserCurrentSessions);
      if (data.length === 0) {
        setNoSessions(true);
      }
    };

    apiCall();
  }, [id]);

  const pastSessions = data.filter((session) => {
    return new Date() > new Date(parseInt(session.fullEndTime));
  });

  let uniqDatesSet = new Set();

  pastSessions.forEach((session) => {
    uniqDatesSet.add(session.date);
  });
  let uniqDates = Array.from(uniqDatesSet);
  uniqDates = uniqDates.sort((a, b) => {
    return new Date(a) - new Date(b);
  });
  let toRender = [];

  return (
    <div className="profile-tab-info">
      {uniqDates.map((date) => {
        const now = new Date();
        for (const session of data) {
          const endTime = new Date(parseInt(session.fullEndTime));
          if (now > endTime && session.date === date) {
            toRender.push(session);
          }

          return(
            <div className="profile-date-grp"><h1>{date}</h1>
            {toRender.map(session => {
              const host = id === session.host.username;
              return (
                <EventPillHost
                  history={true}
                  host={host}
                  participant={true}
                  event={session}
                />
              );
            })}
          </div>
        );
      })}
      {noSessions === 0 ? (
        <h1 className="not-found">No Past Sessions!</h1>
      ) : null}
    </div>
  );
}

export default ProfileHistoryTab;
