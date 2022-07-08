import React from "react";
import "./sessionspagestyles.css";
import star from "../../pics/star.png";
import defaultProfilePic from "../../pics/defaultProfilePic.png";
import personIcon from "../../pics/person.png";
import AnnouncementInput from "./AnnouncementInput";
import FriendOverlay from "./FriendOverlay";
import ChatBox from "./ChatBox";
import {
  getSessionInfo,
  getUserIdentity,
  joinSession,
} from "../../GraphQLQueries/queries";
import { useParams } from "react-router-dom";
import { Loading } from "../Loading/Loading";

function SessionsPageBody(props) {
  const { id } = useParams();
  const [friendOverlay, setFriendOverlay] = React.useState(false);
  const [sessionInfo, setSessionInfo] = React.useState({
    sport: "",
    location: "",
    date: "",
    description: "",
    startTime: "",
    endTime: "",
    minStar: 0,
    host: {
      fName: "",
      lName: "",
      username: "",
      ratings: 0,
      image: "",
    },
    participants: [],
    currentParticipants: 0,
    maxParticipants: 0,
  });

  React.useEffect(() => {
    const apiCall = async () => {
      const session = await getSessionInfo(id);
      setSessionInfo(session.data.data.getSessionInfo);
    };

    apiCall();
  }, [id]);

  if (sessionInfo.sport === "") {
    return <Loading />
  }

  async function handleSessionJoin(e) {
    const userId = await getUserIdentity();
    joinSession(userId.data.data.userIdentity, id);
    window.location.reload();
  }
  //props used to retrieve user information.
  //Use React router dom (useParams) to get id from url. Use id to query necessary info abt session. API call initialised from this componenet. No props needed.
  const user = props.user;

  const host = sessionInfo.host.username === user;
  let participant = false;
  sessionInfo.participants.forEach((x) => {
    if (x.username === user) {
      participant = true;
    }
  });
  //another api call to retrieve host details
  const hostRating = sessionInfo.host.ratings;

  const participantsPax =
    sessionInfo.currentParticipants + "/" + sessionInfo.maxParticipants;

  const sessionTitle = sessionInfo.sport + " @ " + sessionInfo.location + ", ";

  const sessionDetails =
    sessionInfo.date +
    " " +
    sessionInfo.startTime +
    " to " +
    sessionInfo.endTime;

  var minStars = [];
  for (var i = 0; i < sessionInfo.minStar; i++) {
    minStars.push("star");
  }

  return (
    <div className="session-page-body">
      <div className="session-left">
        <div className="event-header">
          <h1 className="event-title">
            {sessionTitle} <br /> {sessionDetails}
          </h1>
          <div className="event-host-details">
            <h3 className="event-subtitle">
              Hosted by:&nbsp;
              <a
                className="profile-link"
                href={"/profile/" + sessionInfo.host.username}
              >
                {sessionInfo.host.fName + " " + sessionInfo.host.lName}
              </a>
            </h3>
            <a href={"/profile/" + sessionInfo.host.username}>
              {sessionInfo.host.image === "" ? (
                <img
                  className="event-host-img"
                  src={defaultProfilePic}
                  alt="profile-pic"
                />
              ) : (
                <img
                  className="event-host-img"
                  src={sessionInfo.host.image}
                  alt="profile-pic"
                />
              )}
            </a>

            <p className="event-host-rating">{hostRating}</p>
            <img
              className="event-host-star-icon"
              alt="event host star icon"
              src={star}
            />
          </div>
        </div>
        <div className="event-description-box">
          <div className="event-description">
            <div className="event-description-desc">
              <p className="event-description-header">Description</p>
              <p className="event-description-body">
                {sessionInfo.description}
              </p>
            </div>
            <div className="event-description-desc">
              <p className="event-description-header">
                Minimum stars required to join session
              </p>
              {minStars.length === 0 ? (
                <p>No Minimum Stars!</p>
              ) : (
                minStars.map(() => {
                  return (
                    <img
                      className="event-minimum-stars"
                      alt="stars"
                      src={star}
                    />
                  );
                })
              )}
            </div>
          </div>
        </div>
        {host || participant ? (
          <ChatBox />
        ) : sessionInfo.participants.length < sessionInfo.maxParticipants ? (
          <button className="join-btn" onClick={handleSessionJoin}>
            I want to go!
          </button>
        ) : (
          <h1>This session is full!</h1>
        )}
      </div>
      <div className="session-right">
        <div className="who-going-box">
          <p className="who-going-box-title">Who's going?</p>
          {sessionInfo.host.image === "" ? (
            <img
              className="event-host-img"
              src={defaultProfilePic}
              alt="profile-pic"
            />
          ) : (
            <img
              className="event-host-img"
              src={sessionInfo.host.image}
              alt="profile-pic"
            />
          )}
          <p
            className="expand-who-going"
            onClick={() => setFriendOverlay(true)}
          >
            ...
          </p>

          <div className="participant-pax-grp">
            <p className="participant-pax">{participantsPax}</p>
            <img alt="man" className="participant-icon" src={personIcon} />
          </div>
        </div>
        <div className="announcement-box-grp">
          <div className="announcement-box">
            <h2 className="announcement-header">Announcements</h2>
            Some code to map announcements
          </div>
          {host ? <AnnouncementInput /> : null}
          <FriendOverlay
            open={friendOverlay}
            closeOverlay={() => setFriendOverlay(false)}
            participants={sessionInfo.participants}
          />
        </div>
      </div>
    </div>
  );
}

export default SessionsPageBody;
