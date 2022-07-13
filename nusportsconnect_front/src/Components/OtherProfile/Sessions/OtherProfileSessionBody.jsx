import React from "react";
import OtherProfileHistoryTab from "../Tabs/OtherProfileHistoryTab.";
import OtherProfileSessionsTab from "../Tabs/OtherProfileSessionsTab";

function OtherProfileSessionBody(props) {
  var sessionsTab = props.friend
    ? "profile-tab-text highlight"
    : "profile-tab profile-tab-text";
  var historyTab = props.friend
    ? "profile-tab profile-tab-text"
    : "profile-tab-text highlight";
  var friendsTab = "profile-tab profile-tab-text";
  var reviewsTab = "profile-tab profile-tab-text";

  return (
    <div className="profile-body">
      <div className="profile-tabs">
        {props.friend ? (
          <h2
            className={sessionsTab}
            // onClick={() => (window.location.href = "/" + id)}
            onClick={() => props.handleClick("sessions")}
          >
            sessions
          </h2>
        ) : null} 
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
      {props.friend ? (
        <OtherProfileSessionsTab user={props.user} />
      ) : (
        <OtherProfileHistoryTab user={props.user} />
      )}
    </div>
  );
}

export default OtherProfileSessionBody;
