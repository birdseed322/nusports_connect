import React from "react";
import { useParams } from "react-router-dom";
import { getUserCurrentSessions } from "../../../GraphQLQueries/queries";
import EventPillHost from "../../EventPill/EventPillHost";

function ProfileHistoryTab(props) {
  const {id} = useParams()
  const [data, setData] = React.useState([])
  React.useEffect(() => {
    const apiCall = async () => {
      const sessions = await getUserCurrentSessions(id);
      setData(sessions.data.data.getUserCurrentSessions);
    };
  
    apiCall();
  }, [id])

  const pastSessions = data.filter((session) =>{
    return new Date() > new Date(parseInt(session.fullEndTime))
  })

  let uniqDatesSet = new Set();

  pastSessions.forEach((session) => {
    uniqDatesSet.add(session.date);
  })
  let uniqDates = Array.from(uniqDatesSet);
  uniqDates = uniqDates.sort((a, b) => {
    return new Date(a) - new Date(b);
  });



  return (
    <div className="profile-tab-info">
              {uniqDates.map(date => {
          let toRender = [];
          const now = new Date()
          for (const session of data) {
            const endTime = new Date(parseInt(session.fullEndTime))
            if (now > endTime && session.date === date){
              toRender.push(session)
            }
          }
          return(
            <div><h1>{date}</h1>
            {toRender.map(session => {
              const host = id === session.host.username;
              return <EventPillHost 
                history={true}
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

export default ProfileHistoryTab;
