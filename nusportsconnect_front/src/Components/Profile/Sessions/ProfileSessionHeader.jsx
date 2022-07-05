import React from "react";
import defaultProfilePic from "../../../pics/defaultProfilePic.png";
import star from "../../../pics/star.png";
import edit from "../../../pics/editbtn.png";
import friends from "../../../pics/friend.png";
import { logout } from "../../../GraphQLQueries/queries";
import { useNavigate } from "react-router-dom";
import { setAccessToken } from "../../../accessToken";

function ProfileSessionHeader(props) {
  const navigate = useNavigate();
  const user = props.user;
  //Owner of account
  const owner = props.owner;
  //Request sent
  const pending = props.pending;
  //Friend
  const friend = props.friend;
  return (
    <div className="profile-header">
      {user.image === "" ? (
        <img className="profile-picture" src={defaultProfilePic} />
      ) : (
        <img
          className="profile-picture"
          src={user.image}
          alt={defaultProfilePic}
        />
      )}
      <div className="profile-details">
        <h1 className="profile-name">{user.fName + " " + user.lName}</h1>
        <p className="profile-info">{user.email}</p>
        <p className="profile-info">
          Playing since: {user.accountCreationDate}
        </p>
        <p className="profile-info">Interested in: {user.interests}</p>
      </div>
      <div className="profile-rating">
        <img alt="star" src={star} className="star" />
        <h1 className="profile-rating-score">5/5</h1>
      </div>
      {owner ? (
        <img
          src={edit}
          alt="edit button"
          className="edit-btn"
          onClick={() =>
            (window.location.href = "/" + user.username + "/editprofile")
          }
        />
      ) : null}
      {owner ? null : friend ? (
        <img src={friends} alt="friend icon" className="friended-icon" />
      ) : pending ? (
        <button className="friend-btn pending">pending</button>
      ) : (
        <button className="friend-btn">+ add friend</button>
      )}
      <button
        className="logout"
        onClick={async () => {
          await logout();
          setAccessToken("");
          navigate("/");
        }}
      >
        logout
      </button>
    </div>
  );
}

export default ProfileSessionHeader;
