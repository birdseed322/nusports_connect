import React from "react";
import "./profileStyles.css";
import Navbar from "../../NavBar/Navbar";
import ProfileSessionBody from "./ProfileSessionBody";
import ProfileSessionHeader from "./ProfileSessionHeader";

//Assume loads to profile sessions by default

function PersonalProfileSession(props) {
  //Dummy code to simulate drawing information of user from database. Should ideally be done in useEffect statement, so info loaded before rendering.

  const user = props.user;

  return (
    <div className="profile-container">
      <Navbar />  
      <ProfileSessionHeader user={user} owner={true} />
      <ProfileSessionBody user={user} />
    </div>
  );
}

export default PersonalProfileSession;
