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
        <img className="profile-picture" alt="profile-pic" src={defaultProfilePic} />
      ) : (
        <img
          className="profile-picture"
          src={user.image}
          alt={defaultProfilePic}
        />
      )}

      <span className="profile-info">
        <h1 className="profile-name">{user.fName + " " + user.lName}</h1>
        <p>
          Playing since: {user.accountCreationDate} <br /> <br />
          Interested in: {user.interests}
        </p>
      </span>
      {owner ? (
        <img
          src={edit}
          alt="edit button"
          className="edit-btn"
          onClick={() =>
            (window.location.href =
              "/profile/" + user.username + "/editprofile")
          }
        />
      ) : null}

      <div className="profile-rating">
        <img alt="star" src={star} className="star" />
        <h1 className="profile-rating-score">{user.ratings}</h1>
      </div>
      {owner ? null : friend ? (
        <img src={friends} alt="friend icon" className="friended-icon" />
      ) : pending ? (
        <button className="friend-btn pending">pending</button>
      ) : (
        <button className="friend-btn">+ add friend</button>
      )}
      {owner ? (
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
      ) : null}
    </div>
  );
}

export default ProfileSessionHeader;
