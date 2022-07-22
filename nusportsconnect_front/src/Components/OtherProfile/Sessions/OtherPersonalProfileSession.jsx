import React, { useState } from "react";
import "../../Profile/Sessions/profileStyles.css";
import Navbar from "../../NavBar/Navbar";
import ProfileSessionHeader from "../../Profile/Sessions/ProfileSessionHeader";
import OtherProfileSessionBody from "./OtherProfileSessionBody";
import OtherProfileHistoryBody from "../History/OtherProfileHistoryBody";
import OtherProfileFriendsBody from "../Friends/OtherProfileFriendsBody";
import OtherProfileReviewsBody from "../Reviews/OtherProfileReviewsBody";
import {
  getAllFriends,
  getUserUsername,
} from "../../../GraphQLQueries/queries";

function OtherPersonalProfileSession(props) {
  const user = props.user;
  const [view, setView] = useState("sessions");
  const socket = props.socket
  const [friend, setFriend] = useState(false);
  const handleClick = (viewState) => {
    setView(viewState);
  };

  React.useEffect(() => {
    const apiCall = async () => {
      let friends = await getAllFriends(user.username);
      let ownUsername = await getUserUsername();
      ownUsername = ownUsername.data.data.userUsername;
      friends = friends.data.data.userFriends;
      friends = friends
        .map((friend) => friend.username)
        .filter((username) => username === ownUsername);
      return friends.length === 1 ? setFriend(true) : null;
    };
    apiCall();
  }, []);

  return (
    <div className="profile-container">
      <Navbar socket={socket}/>
      <ProfileSessionHeader user={user} owner={false} friend={friend} socket={socket}/>
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
    </div>
  );
}

export default OtherPersonalProfileSession;
