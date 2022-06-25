import React from "react";
import EventPillHost from "../../EventPill/EventPillHost";

function ProfileSessionsTab(props) {
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
      <EventPillHost
        host={host}
        history={false}
        event={event}
        participant={participant}
      />
    </div>
  );
}

export default ProfileSessionsTab;
