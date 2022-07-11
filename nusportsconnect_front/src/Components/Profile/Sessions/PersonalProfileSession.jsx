import React from "react";
import "./profileStyles.css";
import Navbar from "../../NavBar/Navbar";
import ProfileSessionBody from "./ProfileSessionBody";
import ProfileSessionHeader from "./ProfileSessionHeader";

//Assume loads to profile sessions by default

function PersonalProfileSession(props) {
  // const [view, setView] = useState("sessions");

  // const handleClick = (viewState) => {
  //   setView(viewState);
  // };

  const user = props.user;
  return (
    <div className="profile-container">
      <Navbar />
      {/* {(() => {
        switch (view) {
          case "sessions":
            return <ProfileSessionBody handleClick={handleClick} user={user} />;
          case "signUp":
            return <AccountCreation handleClick={handleClick} />;
          case "pwReset":
            return <PasswordReset handleClick={handleClick} />;
          case "sessions":
            return <Sessions />;
          default:
            return null;
        }
      })()} */}
      <ProfileSessionHeader user={user} owner={true} />
      <ProfileSessionBody user={user} />
    </div>
  );
}

export default PersonalProfileSession;
