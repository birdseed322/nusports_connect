import React from "react";
import defaultProfilePic from "../../pics/defaultProfilePic.png";
import star from "../../pics/star.png";

function ParticipantBubble(props) {
  return (
    <div className="participant-bubble">
      {props.image === "" ? (
        <img className="participant-prof-pic" src={defaultProfilePic} />
      ) : (
        <img
          className="participant-prof-pic"
          src={props.image}
          alt={defaultProfilePic}
        />
      )}

      <div className="participant-details">
        <p className="participant-name">{props.name}</p>
        <img className="participant-rating-star" alt="star" src={star} />
        <p className="participant-rating">{props.rating}/5</p>
      </div>
    </div>
  );
}

export default ParticipantBubble;
