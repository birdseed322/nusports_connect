import React from "react";
import locationIcon from "../../pics/location-dot-solid.png";
import timeIcon from "../../pics/clock-solid.png";
import personIcon from "../../pics/person.png";
import HostButtons from "./Buttons/HostButtons";
import ParticipantButtons from "./Buttons/ParticipantButtons";
import "./EventPillStyles.css";
import HistoryButtons from "./Buttons/HistoryButtons";
import NonParticipantButtons from "./Buttons/NonParticipantButtons";
import { leaveSession } from "../../GraphQLQueries/queries";
import { reqOriginRoute } from "../../Routes/routes";

function EventPillHost(props) {
  const event = props.event;
  const socket = props.socket;

  function handleLeave(e) {
    leaveSession(event.id);
    socket.emit("leave session", {
      username: props.username,
      hostUsername: event.host.username,
      link: reqOriginRoute + "/sessions/" + event.id,
    });
    window.location.reload();
  }

  return (
    <div className="event-pill">
      <h1 className="event-pill-header">{event.sport}</h1>
      <div className="event-location event-detail-header">
        <img alt="location-icon" className="location-icon" src={locationIcon} />
        <p className="event-detail">{event.location}</p>
      </div>
      <div className="event-time event-detail-header">
        <img alt="time-icon" className="time-icon" src={timeIcon} />
        <p className="event-detail">
          {event.startTime} - {event.endTime}
        </p>
      </div>
      <div className="event-pax">
        <p className="event-attendance">
          {event.currentParticipants}/{event.maxParticipants}
        </p>
        <img alt="pax-icon" className="pax-icon" src={personIcon} />
      </div>
      {props.history ? (
        <HistoryButtons id={event.id} />
      ) : props.host ? (
        <HostButtons id={event.id} handleLeave={handleLeave} />
      ) : props.participant ? (
        <ParticipantButtons id={event.id} handleLeave={handleLeave} />
      ) : (
        <NonParticipantButtons id={event.id} />
      )}
    </div>
  );
}

export default EventPillHost;
