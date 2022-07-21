import React, { useState } from "react";
import "./profileStyles.css";
import Navbar from "../../NavBar/Navbar";
import ProfileSessionHeader from "./ProfileSessionHeader";
import ProfileSessionBody from "./ProfileSessionBody";
import ProfileHistoryBody from "../History/ProfileHistoryBody";
import ProfileFriendsBody from "../Friends/ProfileFriendsBody";
import ProfileReviewsBody from "../Reviews/ProfileReviewsBody";

function PersonalProfileSession(props) {
  const [view, setView] = useState("sessions");
  const socket = props.socket
  const handleClick = (viewState) => {
    setView(viewState);
  };

  const user = props.user;
  console.log(user);
  return (
    <div className="profile-container">
      <Navbar socket={socket}/>
      <ProfileSessionHeader user={user} owner={true} />
      {(() => {
        switch (view) {
          case "sessions":
            return <ProfileSessionBody handleClick={handleClick} user={user} socket={socket}/>;
          case "history":
            return <ProfileHistoryBody handleClick={handleClick} user={user} />;
          case "friends":
            return <ProfileFriendsBody handleClick={handleClick} user={user} />;
          case "reviews":
            return <ProfileReviewsBody handleClick={handleClick} user={user} />;
          default:
            return null;
        }
      })()}
    </div>
  );
}

export default PersonalProfileSession;
