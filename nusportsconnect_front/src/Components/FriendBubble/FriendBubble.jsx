import React from "react";
import { acceptFriend, rejectFriend } from "../../GraphQLQueries/queries";
import "./FriendBubbleStyles.css";
import defaultPic from "../../pics/defaultProfilePic.png";

function FriendBubble({ friend, pending, user }) {
  function accept() {
    acceptFriend(friend.username, user.username);
    window.location.reload();
  }
  function reject() {
    rejectFriend(friend.username, user.username);
    window.location.reload();
  }
  //   console.log(friend);
  return (
    <div className="friend-bubble">
      <a className="profile-link" href={"/profile/" + friend.username}>
        {friend.image === "" ? (
          <img
            className="friend-profile-pic"
            src={defaultPic}
            alt="profile-pic"
          />
        ) : (
          <img
            className="friend-profile-pic"
            src={friend.image}
            alt="profile-pic"
          />
        )}
      </a>

      <a className="profile-link" href={"/profile/" + friend.username}>
        <h2 className="friend-name">{friend.fName + " " + friend.lName}</h2>
      </a>
      {pending ? (
        <div>
          <button className="friend-accept-btn" onClick={accept}>
            ✓
          </button>
          <button className="friend-reject-btn" onClick={reject}>
            ✕
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default FriendBubble;
