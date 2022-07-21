import React from "react";
import "./profileBodyStyles.css";
import ProfileSessionsTab from "./ProfileSessionsTab";

function ProfileSessionBody(props) {
  var sessionsTab = "profile-tab-text highlight";
  var historyTab = "profile-tab profile-tab-text";
  var friendsTab = "profile-tab profile-tab-text";
  var reviewsTab = "profile-tab profile-tab-text";
  const socket = props.socket

  return (
    <div className="profile-body">
      <div className="profile-tabs">
        <h2
          className={sessionsTab}
          // onClick={() => (window.location.href = "/profile/" + id)}
          onClick={() => props.handleClick("sessions")}
        >
          sessions
        </h2>
        <h2
          className={historyTab}
          // onClick={() => (window.location.href = "/profile/" + id + "/history")}
          onClick={() => props.handleClick("history")}
        >
          history
        </h2>
        <h2
          className={friendsTab}
          // onClick={() => (window.location.href = "/profile/" + id + "/friends")}
          onClick={() => props.handleClick("friends")}
        >
          friends
        </h2>
        <h2
          className={reviewsTab}
          // onClick={() => (window.location.href = "/profile/" + id + "/reviews")}
          onClick={() => props.handleClick("reviews")}
        >
          reviews
        </h2>
      </div>
      <hr />
      <ProfileSessionsTab user={props.user} socket={socket}/>
    </div>
  );
}

export default ProfileSessionBody;
