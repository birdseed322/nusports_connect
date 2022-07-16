import React from "react";
import "../Sessions/profileHeaderStyles.css";
import Navbar from "../../NavBar/Navbar";
import ProfileSessionHeader from "../Sessions/ProfileSessionHeader";
import ProfileReviewsBody from "./ProfileReviewsBody";

function PersonalProfileReview(props) {
  const user = props.user;

  return (
    <div>
      <Navbar />
      <ProfileSessionHeader user={user} owner={true} />
      <ProfileReviewsBody user={user} />
    </div>
  );
}

export default PersonalProfileReview;
