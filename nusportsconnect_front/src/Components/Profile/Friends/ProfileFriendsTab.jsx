import React, { useState } from "react";
import FriendBubble from "../../FriendBubble/FriendBubble";
import magnifyingGlass from "../../../pics/magnifying-glass-solid.png";
import {
  getAllFriendRequests,
  getAllFriends,
} from "../../../GraphQLQueries/queries";

function ProfileFriendsTab(props) {
  const user = props.user;
  const [friends, setFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [friendsLength, setFriendsLengths] = useState("");
  const [searchFriendsInput, setSearchFriendsInput] = useState("");
  const [filteredFriends, setFilteredFriends] = useState("");
  const [noFriends, setNoFriends] = useState(false);

  React.useEffect(() => {
    const apiCall = async () => {
      let friends = await getAllFriends(user.username);
      friends = friends.data.data.userFriends;
      friends.sort((a, b) => a.fName.localeCompare(b.fName));
      setFriends(friends);
      setFriendsLengths(friends.length);
      const friendRequests = await getAllFriendRequests(user.username);
      setFriendRequests(friendRequests.data.data.userFriendRequests);
      if ((friends.length === 0) & (friendRequests.length === 0)) {
        setNoFriends(true);
      }
    };
    apiCall();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    try {
      const editedSearchFriendsInput = searchFriendsInput
        .toLowerCase()
        .replace(/ /g, "");
      const filteredFriends = friends.filter((friend) => {
        const fName = friend.fName.toLowerCase();
        const lName = friend.lName.toLowerCase();
        const name = fName + lName;
        return name.startsWith(editedSearchFriendsInput);
      });
      setFilteredFriends(filteredFriends);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="profile-tab-info">
      <div className="profile-friend-tab-header">
        <h2 className="friend-count">
          {friendsLength === 1
            ? friendsLength + " Friend"
            : friendsLength + " Friends"}
        </h2>
        <form action="" onSubmit={handleSubmit}>
          <img src={magnifyingGlass} alt="search" className="search-icon" />
          <input
            placeholder="Find friend"
            className="search-input"
            onChange={(e) => setSearchFriendsInput(e.target.value)}
          />
          <button className="search-friend-btn">search</button>
        </form>
      </div>
      <div className="friends-tab">
        {friendRequests.map((friend) => (
          <FriendBubble friend={friend} user={user} pending={true} />
        ))}

        {filteredFriends === "" ? (
          friends.map((friend) => (
            <FriendBubble friend={friend} user={user} pending={false} />
          ))
        ) : filteredFriends.length === 0 ? (
          <h1>No friends found!</h1>
        ) : (
          filteredFriends.map((friend) => (
            <FriendBubble friend={friend} user={user} pending={false} />
          ))
        )}
        {noFriends ? <h1 className="not-found">No friends 😔 </h1> : null}
      </div>
    </div>
  );
}

export default ProfileFriendsTab;
