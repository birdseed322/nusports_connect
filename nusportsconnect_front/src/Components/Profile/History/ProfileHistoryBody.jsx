import React from "react";
import "../Sessions/profileBodyStyles.css";
import ProfileHistoryTab from "./ProfileHistoryTab";

function ProfileHistoryBody(props) {
  var sessionsTab = "profile-tab profile-tab-text";
  var historyTab = "profile-tab-text highlight";
  var friendsTab = "profile-tab profile-tab-text";
  var reviewsTab = "profile-tab profile-tab-text";

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
      <ProfileHistoryTab user={props.user} />
    </div>
  );
}

export default ProfileHistoryBody;
