import React from "react";
import "../Sessions/profileBodyStyles.css";
import ProfileReviewsTab from "./ProfileReviewsTab";

function ProfileReviewsBody(props) {
  var sessionsTab = "profile-tab profile-tab-text";
  var historyTab = "profile-tab profile-tab-text";
  var friendsTab = "profile-tab profile-tab-text";
  var reviewsTab = "profile-tab-text highlight";

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
      <ProfileReviewsTab user={props.user} />
    </div>
  );
}

export default ProfileReviewsBody;
