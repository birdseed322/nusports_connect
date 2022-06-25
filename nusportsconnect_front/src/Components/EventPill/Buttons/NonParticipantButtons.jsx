import React from "react";

function NonParticipantButtons(props) {
  return (
    <div className="host-btns">
      <button className="event-action-btn view-event-btn" onClick={() => window.location.href = "/sessions/" + props.id}>View</button>
    </div>
  );
}

export default NonParticipantButtons;
