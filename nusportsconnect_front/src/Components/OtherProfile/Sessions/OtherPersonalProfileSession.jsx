import React, { useState } from "react";
import "../../Profile/Sessions/profileStyles.css";
import Navbar from "../../NavBar/Navbar";
import ProfileSessionHeader from "../../Profile/Sessions/ProfileSessionHeader";
import OtherProfileSessionBody from "./OtherProfileSessionBody";
import OtherProfileHistoryBody from "../History/OtherProfileHistoryBody";
import OtherProfileFriendsBody from "../Friends/OtherProfileFriendsBody";
import OtherProfileReviewsBody from "../Reviews/OtherProfileReviewsBody";

function OtherPersonalProfileSession(props) {
  const [view, setView] = useState("sessions");
  const socket = props.socket
  const handleClick = (viewState) => {
    setView(viewState);
  };

  const user = props.user;

  //Based on user info and the API call to backend retrieving this profile's info
  const friend = true;

  return (
    <div className="profile-container">
      <Navbar socket={socket}/>
      <ProfileSessionHeader user={user} owner={false} friend={friend} />
      {(() => {
        switch (view) {
          case "sessions":
            return (
              <OtherProfileSessionBody
                handleClick={handleClick}
                user={user}
                friend={friend}
                socket={socket}
              />
            );
          case "history":
            return (
              <OtherProfileHistoryBody
                handleClick={handleClick}
                user={user}
                friend={friend}
              />
            );
          case "friends":
            return (
              <OtherProfileFriendsBody
                handleClick={handleClick}
                user={user}
                friend={friend}
              />
            );
          case "reviews":
            return (
              <OtherProfileReviewsBody
                handleClick={handleClick}
                user={user}
                friend={friend}
              />
            );
          default:
            return null;
        }
      })()}
      {/* <OtherProfileSessionBody user={user} friend={friend} /> */}
    </div>
  );
}

export default OtherPersonalProfileSession;
