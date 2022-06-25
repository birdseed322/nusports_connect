import React from "react";
import locationIcon from "../../pics/location-dot-solid.png";
import timeIcon from "../../pics/clock-solid.png";
import personIcon from "../../pics/person.png";
import HostButtons from "./Buttons/HostButtons";
import ParticipantButtons from "./Buttons/ParticipantButtons";
import "./EventPillStyles.css";
import HistoryButtons from "./Buttons/HistoryButtons";
import NonParticipantButtons from "./Buttons/NonParticipantButtons";

function EventPillHost(props) {
  const event = props.event;

  return (
    <div className="event-pill">
      <h1 className="event-pill-header">{event.eventName}</h1>
      <div className="event-location event-detail-header">
        <img alt="location-icon" className="location-icon" src={locationIcon} />
        <p className="event-detail">{event.eventLocation}</p>
      </div>
      <div className="event-time event-detail-header">
        <img alt="time-icon" className="time-icon" src={timeIcon} />
        <p className="event-detail">
          {event.eventStart} - {event.eventEnd}
        </p>
      </div>
      <div className="event-pax">
        <p className="event-attendance">
          {event.eventCurrentPax}/{event.eventMaxPax}
        </p>
        <img alt="pax-icon" className="pax-icon" src={personIcon} />
      </div>
      {props.history ? (
        <HistoryButtons id={event.id} />
      ) : props.host ? (
        <HostButtons id={event.id}/>
      ) : props.participant ? (
        <ParticipantButtons id={event.id}/>
      ) : (
        <NonParticipantButtons id={event.id}/>
      )}
    </div>
  );
}

export default EventPillHost;
