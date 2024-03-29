import React from "react";
import "../Sessions/profileHeaderStyles.css";
import Navbar from "../../NavBar/Navbar";
import ProfileSessionHeader from "../Sessions/ProfileSessionHeader";
import ProfileFriendsBody from "./ProfileFriendsBody";

//Assume loads to profile sessions by default

function PersonalProfileFriends(props) {
  const user = props.user;

  return (
    <div>
      <Navbar />
      <ProfileSessionHeader user={user} owner={true} />
      <ProfileFriendsBody user={user} />
    </div>
  );
}

export default PersonalProfileFriends;
