import React, { useState } from "react";
import defaultProfilePic from "../../../pics/defaultProfilePic.png";
import star from "../../../pics/star.png";
import edit from "../../../pics/editbtn.png";
import friends from "../../../pics/friend.png";
import {
  acceptFriend,
  addFriend,
  getAllFriendRequests,
  getAllFriends,
  getUserIdentity,
  getUserUsername,
  logout,
  rejectFriend,
  removeFriend,
} from "../../../GraphQLQueries/queries";
import { useNavigate } from "react-router-dom";
import { setAccessToken } from "../../../accessToken";
import { getRating } from "../../../generalFunctions";
import { reqOriginRoute } from "../../../Routes/routes";
import ReactTooltip from "react-tooltip";

function ProfileSessionHeader(props) {
  const navigate = useNavigate();
  const user = props.user;
  const socket = props.socket;
  const [ownUsername, setOwnUsername] = useState("");
  //Owner of account
  const owner = props.owner;

  const [isPending, setPending] = useState(false);
  const [isFriend, setFriend] = useState(false);
  const [isStranger, setStranger] = useState(false);
  const [isAccepting, setAccepting] = useState(false);
  const [confirmRemove, setConfirmRemove] = useState(false);

  React.useEffect(() => {
    if (!owner) {
      const apiCall = async () => {
        let ownUsername = await getUserUsername();
        ownUsername = ownUsername.data.data.userUsername;
        setOwnUsername(ownUsername);
        let ownFriendRequests = await getAllFriendRequests(ownUsername);
        ownFriendRequests = ownFriendRequests.data.data.userFriendRequests;
        let otherUserFriends = await getAllFriends(user.username);
        otherUserFriends = otherUserFriends.data.data.userFriends;
        let otherUserFriendRequests = await getAllFriendRequests(user.username);
        otherUserFriendRequests =
          otherUserFriendRequests.data.data.userFriendRequests;

        ownFriendRequests = ownFriendRequests.filter(
          (friend) => friend.username === user.username
        );
        otherUserFriends = otherUserFriends.filter(
          (friend) => friend.username === ownUsername
        );
        otherUserFriendRequests = otherUserFriendRequests.filter(
          (friend) => friend.username === ownUsername
        );

        return otherUserFriends.length === 1
          ? setFriend(true)
          : otherUserFriendRequests.length === 1
          ? setPending(true)
          : ownFriendRequests.length === 1
          ? setAccepting(true)
          : setStranger(true);
      };
      apiCall();
    }
  }, []);

  async function sendFriendRequest() {
    let ownId = await getUserIdentity();
    ownId = ownId.data.data.userIdentity;
    await addFriend(ownId, user.username);
    socket.emit("send friend request", {senderUsername: ownUsername, receiverUsername:user.username, link: reqOriginRoute + "/profile/" + ownUsername})
    setPending(true);
  }

  async function accept() {
    await acceptFriend(user.username, ownUsername);
    window.location.reload();
  }

  async function reject() {
    await rejectFriend(user.username, ownUsername);
    window.location.reload();
  }

  function remove() {
    setConfirmRemove(true);
  }

  function cancelRemove() {
    setConfirmRemove(false);
  }

  async function handleRemove() {
    await removeFriend(user.username, ownUsername);
    window.location.reload();
  }

  return (
    <div className="profile-header">
      {user.image === "" ? (
        <img
          className="profile-picture"
          alt="profile-pic"
          src={defaultProfilePic}
        />
      ) : (
        <img
          className="profile-picture"
          src={user.image}
          alt={defaultProfilePic}
        />
      )}

      <span className="profile-info">
        {/* Displays Name, account creation date and interests */}
        <h1 className="profile-name">{user.fName + " " + user.lName}</h1>
        <p>
          Playing since: {user.accountCreationDate} <br /> <br />
          Interested in: {user.interests}
        </p>

        {/* Checks if owner of profile to render edit profile button. */}
        {owner ? (
          <div>
            <img
              src={edit}
              alt="edit button"
              className="edit-btn"
              onClick={() =>
                (window.location.href =
                  "/profile/" + user.username + "/editprofile")
              }
              data-tip="Edit profile"
            />
          </div>
        ) : null}
      </span>

      {/* Displays rating of user. */}
      <div className="profile-rating">
        <img alt="star" src={star} className="star" />
        <h1 className="profile-rating-score"> {getRating(user.ratings)}</h1>
      </div>

      {/* Checks if owner of profile. If not, checks whether it is a friend, pending friend, or not a friend. */}
      {owner ? null : isFriend ? (
        <img src={friends} alt="friend icon" className="friended-icon" />
      ) : isPending ? (
        <button className="friend-btn pending">pending</button>
      ) : isAccepting ? (
        <div>
          <button className="header-accept-btn" onClick={accept}>
            Accept
          </button>
          <button className="header-reject-btn" onClick={reject}>
            Reject
          </button>
        </div>
      ) : isStranger ? (
        <button className="friend-btn" onClick={sendFriendRequest}>
          + add friend
        </button>
      ) : null}

      {/* Checks if owner of profile/friend to render logout button/remove friend button accordingly  */}
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
      ) : confirmRemove ? (
        <div>
          <div className="remove-warning">Remove this friend?</div>
          <button className="confirm-remove-btn" onClick={handleRemove}>
            Confirm{" "}
          </button>
          <button className="cancel-remove-btn" onClick={cancelRemove}>
            Cancel
          </button>
        </div>
      ) : isFriend ? (
        <button className="remove-friend-btn" onClick={remove}>
          Remove friend
        </button>
      ) : null}
    </div>
  );
}

export default ProfileSessionHeader;
