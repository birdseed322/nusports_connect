import React from "react";
import "../../Profile/Sessions/profileStyles.css";
import Navbar from "../../NavBar/Navbar";
import ProfileSessionHeader from "../../Profile/Sessions/ProfileSessionHeader";
import OtherProfileSessionBody from "./OtherProfileSessionBody";

function OtherPersonalProfileSession(props) {
  //Dummy code to simulate drawing information of user from database. Should ideally be done in useEffect statement, so info loaded before rendering.
  
  const testUser = props.user
  console.log(testUser)
  
  const user = {
    name : "Sum Wong Als",
    email : "someemail@gmail.com",
    rating : 4.2,
    creationDate : "20/02/22",
    sportingInterests : ["Tennis", "Ultimate Frisbee"],
    friendCount : 18
  };

  //Based on user info and the API call to backend retrieving this profile's info
  const friend = false;

  return (
    <div className="profile-container">
      <Navbar />
      <ProfileSessionHeader user={user} owner={false} friend={friend}/>
      <OtherProfileSessionBody user={user} friend={friend}/>
    </div>
  );
}

export default OtherPersonalProfileSession;
