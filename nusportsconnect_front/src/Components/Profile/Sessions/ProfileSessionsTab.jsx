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

  let uniqDatesSet = new Set();
  data.forEach((session) => {
    uniqDatesSet.add(session.date);
  })
  let uniqDates = Array.from(uniqDatesSet);
  uniqDates = uniqDates.sort((a, b) => {
    return new Date(a) - new Date(b);
  });

  //Dummy code. Ideally will pull a list of events associated w member. Then use map function to create pill for each event.
  const event = {
    id: "62b6b0530eb2c24058edcf78",
    eventName: "Badminton",
    eventLocation: "UTSH2",
    eventStart: "9am",
    eventEnd: "11am",
    eventMembers: ["Wesley Teo", "Ezekiel Ang", "Samuel Tay"],
    eventCurrentPax: 3,
    eventMaxPax: 4,
    eventHost: "Peter Tan",
  };

  //Check if host of event. Should be inside the map function when parsing through list of event.
  const host = props.user.name === event.eventHost;
  const participant = event.eventMembers.includes(props.user.name);

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
              return <EventPillHost 
                history={false}
                host={host}
                participant={participant}
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
