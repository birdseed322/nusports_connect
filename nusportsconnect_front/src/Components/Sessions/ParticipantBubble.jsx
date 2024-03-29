import React from "react";
import { getRating } from "../../generalFunctions";
import defaultProfilePic from "../../pics/defaultProfilePic.png";
import star from "../../pics/star.png";

function ParticipantBubble(props) {
  return (
    <div className="participant-bubble">
      <a className="profile-link" href={"/profile/" + props.username}>
        {props.image === "" ? (
          <img
            className="participant-prof-pic"
            src={defaultProfilePic}
            alt="profile-pic"
          />
        ) : (
          <img
            className="participant-prof-pic"
            src={props.image}
            alt="profile-pic"
          />
        )}
      </a>

      <div className="participant-details">
        <a className="profile-link" href={"/profile/" + props.username}>
          <p className="participant-name">{props.name}</p>
        </a>
        <img className="participant-rating-star" alt="star" src={star} />
        <p className="participant-rating">{getRating(props.rating)}/5</p>
      </div>
    </div>
  );
}

export default ParticipantBubble;
