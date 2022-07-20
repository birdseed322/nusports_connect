import React, { useState } from "react";
import FriendBubble from "../../FriendBubble/FriendBubble";
import magnifyingGlass from "../../../pics/magnifying-glass-solid.png";
import {
  getAllFriendRequests,
  getAllFriends,
} from "../../../GraphQLQueries/queries";

function ProfileFriendsTab(props) {
  const user = props.user;
  console.log(user);
  const [friends, setFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [friendsLength, setFriendsLengths] = useState("");

  React.useEffect(() => {
    const apiCall = async () => {
      let friends = await getAllFriends(user.username);
      friends = friends.data.data.userFriends;
      friends.sort((a, b) => a.fName.localeCompare(b.fName));
      setFriends(friends);
      setFriendsLengths(friends.length);
      const friendRequests = await getAllFriendRequests(user.username);
      setFriendRequests(friendRequests.data.data.userFriendRequests);
    };
    apiCall();
  }, []);

  console.log(friends);
  console.log(friendRequests);
  return (
    <div className="profile-tab-info">
      <div className="profile-friend-tab-header">
        <h2 className="friend-count">
          {friendsLength === 1
            ? friendsLength + " Friend"
            : friendsLength + " Friends"}
        </h2>
        {/* <form action="">
          <img src={magnifyingGlass} alt="search" className="search-icon" />
          <input placeholder="Find friend" className="search-input" />
          <button>search</button>
        </form> */}
      </div>
      <div className="friends-tab">
        {friendRequests.map((friend) => (
          <FriendBubble friend={friend} user={user} pending={true} />
        ))}
        {friends.map((friend) => (
          <FriendBubble friend={friend} user={user} pending={false} />
        ))}
      </div>
    </div>
  );
}

export default ProfileFriendsTab;
