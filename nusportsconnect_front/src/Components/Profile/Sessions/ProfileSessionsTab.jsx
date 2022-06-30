import React from "react";
import { useParams } from "react-router-dom";
import { getUserCurrentSessions } from "../../../GraphQLQueries/queries";
import EventPillHost from "../../EventPill/EventPillHost";

function ProfileSessionsTab(props) {
  const {id} = useParams()
  const [data, setData] = React.useState([])
  React.useEffect(() => {
    const apiCall = async () => {
      const sessions = await getUserCurrentSessions(id);
      setData(sessions.data.data.getUserCurrentSessions);
    };
  
    apiCall();
  }, [id])

  const upcomingSessions = data.filter((session) =>{
    return new Date() < new Date(parseInt(session.fullEndTime))
  })

  let uniqDatesSet = new Set();
  upcomingSessions.forEach((session) => {
    uniqDatesSet.add(session.date);
  })
  let uniqDates = Array.from(uniqDatesSet);
  uniqDates = uniqDates.sort((a, b) => {
    return new Date(a) - new Date(b);
  });

  //Check if host of event. Should be inside the map function when parsing through list of event.

  return (
    <div className="profile-tab-info">
              {uniqDates.map(date => {
          let toRender = [];
          for (const session of data) {
            if (session.date === date){
              toRender.push(session)
            }
          }
          return(
            <div><h1>{date}</h1>
            {toRender.map(session => {
              const host = id === session.host.username;
              return <EventPillHost 
                history={false}
                host={host}
                participant={true}
                event={session}
                />
            })}
            </div>
          )
  })}
    </div>
  );
}

export default ProfileSessionsTab;
