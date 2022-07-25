import React, { useState } from "react";
import {
  getAllFriendRequests,
  getAllFriends,
} from "../../../GraphQLQueries/queries";
import FriendBubble from "../../FriendBubble/FriendBubble";

function OtherProfileFriendsTab(props) {
  console.log(props);
  const user = props.user;
  const [friends, setFriends] = useState([]);
  const [friendsLength, setFriendsLengths] = useState(0);
  const [noFriends, setNoFriends] = useState(false);

  React.useEffect(() => {
    const apiCall = async () => {
      let friends = await getAllFriends(user.username);
      let allFriends = friends.data.data.userFriends;
      allFriends.sort((a, b) => a.fName.localeCompare(b.fName));
      setFriends(allFriends);
      setFriendsLengths(allFriends.length);
      if (friends.data.data.userFriends.length === 0) {
        setNoFriends(true);
      }
    };
    apiCall();
  }, []);

  console.log(friends);
  return (
    <div className="profile-tab-info">
      <div className="profile-friend-tab-header">
        <h2 className="friend-count">
          {friendsLength === 1
            ? friendsLength + " Friend"
            : friendsLength + " Friends"}
        </h2>
      </div>
      <div className="friends-tab">
        {noFriends ? (
          <h1 className="not-found">No friends 😔 </h1>
        ) : (
          friends.map((friend) => (
            <FriendBubble friend={friend} user={user} pending={false} />
          ))
        )}
      </div>
    </div>
  );
}

export default OtherProfileFriendsTab;
