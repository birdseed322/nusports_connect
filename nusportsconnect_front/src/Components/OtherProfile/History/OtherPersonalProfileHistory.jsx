import React from "react";
import "../../Profile/Sessions/profileStyles.css";
import Navbar from "../../NavBar/Navbar";
import ProfileSessionHeader from "../../Profile/Sessions/ProfileSessionHeader";
import OtherProfileHistoryBody from "./OtherProfileHistoryBody";

function OtherPersonalProfileHistory(props) {
  const user = props.user;

  //Based on user info and the API call to backend retrieving this profile's info
  const friend = true;

  return (
    <div className="profile-container">
      <Navbar />
      <ProfileSessionHeader user={user} owner={false} friend={friend}/>
      <OtherProfileHistoryBody user={user} friend={friend}/>
    </div>
  );
}

export default OtherPersonalProfileHistory;
