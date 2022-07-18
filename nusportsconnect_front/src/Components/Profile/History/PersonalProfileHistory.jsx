import React from "react";
import "../Sessions/profileHeaderStyles.css";
import Navbar from "../../NavBar/Navbar";
import ProfileSessionHeader from "../Sessions/ProfileSessionHeader";
import ProfileHistoryBody from "./ProfileHistoryBody";

//Assume loads to profile sessions by default

function PersonalProfileHistory(props) {
  const user = props.user;

  return (
    <div>
      <Navbar />
      <ProfileSessionHeader user={user} owner={true} />
      <ProfileHistoryBody user={user} />
    </div>
  );
}

export default PersonalProfileHistory;
