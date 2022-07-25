import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { getUserCurrentSessions } from "../../../GraphQLQueries/queries";
import EventPillHost from "../../EventPill/EventPillHost";

function OtherProfileHistoryTab(props) {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [noSessions, setNoSessions] = useState(false);

  React.useEffect(() => {
    const apiCall = async () => {
      let sessions = await getUserCurrentSessions(id);
      sessions = sessions.data.data.getUserCurrentSessions;
      const pastSessions = sessions.filter((session) => {
        return new Date() > new Date(parseInt(session.fullEndTime));
      });
      if (pastSessions.length === 0) {
        setNoSessions(true);
      } else {
        setNoSessions(false);
        setData(pastSessions);
      }
    };
    apiCall();
  }, [id]);
  let uniqDatesSet = new Set();

  data.forEach((session) => {
    if (session.currentParticipants !== 0) {
      uniqDatesSet.add(session.date);
    }
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
        }
        return (
          <div className="profile-date-grp">
            <h1 className="profile-date-header">{date}</h1>
            {toRender.map((session) => {
              return (
                <EventPillHost
                  history={false}
                  host={false}
                  participant={false}
                  event={session}
                />
              );
            })}
          </div>
        );
      })}
      {noSessions ? <h1 className="not-found">No Past Sessions!</h1> : null}
    </div>
  );
}

export default OtherProfileHistoryTab;
