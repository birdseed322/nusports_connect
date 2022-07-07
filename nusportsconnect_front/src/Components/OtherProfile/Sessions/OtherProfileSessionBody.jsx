import React from "react";
import { useParams } from "react-router-dom";
import OtherProfileHistoryTab from "../Tabs/OtherProfileHistoryTab.";
import OtherProfileSessionsTab from "../Tabs/OtherProfileSessionsTab";

function OtherProfileSessionBody(props) {
  let { id } = useParams();
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
            onClick={() => (window.location.href = "/" + id)}
          >
            sessions
          </h2>
        ) : null}
        <h2
          className={historyTab}
          onClick={() => (window.location.href = "/profile/" + id + "/history")}
        >
          history
        </h2>
        <h2
          className={friendsTab}
          onClick={() => (window.location.href = "/profile/" + id + "/friends")}
        >
          friends
        </h2>
        <h2
          className={reviewsTab}
          onClick={() => (window.location.href = "/profile/" + id + "/reviews")}
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
